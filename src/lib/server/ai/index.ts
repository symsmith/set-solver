import { MISTRAL_API_KEY } from '$env/static/private';
import { setDescriptionSchema } from '$lib/shared/schemas/solver';
import { createMistral } from '@ai-sdk/mistral';
import { valibotSchema } from '@ai-sdk/valibot';
import { generateObject, NoObjectGeneratedError } from 'ai';

const mistral = createMistral({
	apiKey: MISTRAL_API_KEY
});

const provider = mistral('mistral-small-latest');

async function retryGeneration<T>(fn: () => Promise<T>, maxRetries = 2) {
	try {
		return await fn();
	} catch (e) {
		if (maxRetries > 0 && e instanceof NoObjectGeneratedError) {
			console.log(
				`No object generated, retrying (${maxRetries} ${maxRetries <= 1 ? 'retry' : 'retries'} left)`
			);
			return retryGeneration(fn, maxRetries - 1);
		}
		throw e;
	}
}

export async function describeSetGame(image: string) {
	try {
		return retryGeneration(
			async () =>
				(
					await generateObject({
						model: provider,
						schema: valibotSchema(setDescriptionSchema),
						output: 'array',
						temperature: 0,
						system:
							'Generate a description of the cards in the image. For example, one card can have two full purple pills. Another example: three striped red diamonds. Another example: one empty green wave. Describe each card with their position (row and column, 0-based). If the center of the items in a card are not definitely white, you should set its filling to `striped`.',
						prompt: [
							{
								role: 'user',
								content: [{ type: 'image', image }]
							}
						]
					})
				).object
		);
	} catch (e) {
		console.error(e);
		throw new Error('Unable to describe the cards');
	}
}
