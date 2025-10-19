import { form } from '$app/server';
import { baseForm, minDelay } from '$lib/api/utils';
import { describeSetGame } from '$lib/server/ai';
import { formatImage, getBase64FromUInt8Array, getUInt8ArrayFromFile } from '$lib/server/images';
import { solveFormSchema } from '$lib/shared/schemas/solver';

export const solve = form(
	solveFormSchema,
	minDelay(
		baseForm(async ({ image }) => {
			const uintImage = await getUInt8ArrayFromFile(image);
			const formattedImage = await formatImage(uintImage);
			const base64 = await getBase64FromUInt8Array(formattedImage);
			const cards = await describeSetGame(base64);
			return { image: base64, cards };
		})
	)
);
