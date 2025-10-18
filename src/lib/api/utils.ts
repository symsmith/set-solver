import { getRequestEvent } from '$app/server';
import type { RemoteFormReturn } from '$lib/shared/types/remote';
import { isRedirect } from '@sveltejs/kit';
import * as v from 'valibot';

function wait(ms = 1000) {
	return new Promise((res) => setTimeout(res, ms));
}

export function getHeaders() {
	return getRequestEvent().request.headers;
}

const errorSchema = v.object({ message: v.pipe(v.string(), v.nonEmpty()) });

export function baseForm<Input, Return = void>(
	handler: (input: Input) => Promise<Return>
): (input: Input) => Promise<RemoteFormReturn<Return>> {
	return async (input) => {
		try {
			const result = await handler(input);
			return { success: result };
		} catch (e) {
			if (isRedirect(e)) {
				throw e;
			}
			if (v.is(errorSchema, e)) {
				return { error: e.message };
			} else {
				console.log(e);
				return { error: 'An unknown error occured' };
			}
		}
	};
}

export function minDelay<Input, Return>(
	handler: (input: Input) => Promise<Return>,
	delay = 400
): (input: Input) => Promise<Return> {
	return async (input) => {
		const start = performance.now();
		const result = await handler(input);
		const remaining = performance.now() - start;
		if (remaining > 15) {
			await wait(delay - remaining);
		}
		return result;
	};
}

export async function getBase64FromFile(file: File) {
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

	// Convert to base64
	let binary = '';
	for (let i = 0; i < imageDataU8.length; i++) {
		binary += String.fromCharCode(imageDataU8[i]!);
	}
	return btoa(binary);
}
