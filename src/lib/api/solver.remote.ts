import { form } from '$app/server';
import { baseForm, getBase64FromFile, minDelay } from '$lib/api/utils';
import { describeSetGame } from '$lib/server/ai';
import { solveFormSchema } from '$lib/shared/schemas/solver';

export const solve = form(
	solveFormSchema,
	minDelay(
		baseForm(async ({ image }) => {
			const base64 = await getBase64FromFile(image);
			const cards = await describeSetGame(base64);
			return { image: base64, cards };
		})
	)
);
