import sharp from 'sharp';

export async function getUInt8ArrayFromFile(file: File) {
	const imageReader = file.stream().getReader();
	const chunks: Uint8Array[] = [];
	let totalLength = 0;

	while (true) {
		const { done, value } = await imageReader.read();
		if (done) break;

		chunks.push(value);
		totalLength += value.length;
	}

	// Combine all chunks into a single Uint8Array
	const imageDataU8 = new Uint8Array(totalLength);
	let offset = 0;
	for (const chunk of chunks) {
		imageDataU8.set(chunk, offset);
		offset += chunk.length;
	}

	return imageDataU8;
}

export async function formatImage(buffer: Uint8Array) {
	return await sharp(buffer)
		.sharpen()
		.resize({
			width: 500,
			withoutEnlargement: true
		})
		.rotate()
		.toBuffer();
}

export async function getBase64FromUInt8Array(buffer: Uint8Array) {
	// Convert to base64
	let binary = '';
	for (let i = 0; i < buffer.length; i++) {
		binary += String.fromCharCode(buffer[i]!);
	}
	return btoa(binary);
}
