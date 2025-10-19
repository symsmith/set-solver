import { MISTRAL_API_KEY } from '$env/static/private';
import { setDescriptionSchema } from '$lib/shared/schemas/solver';
import { createMistral } from '@ai-sdk/mistral';
import { valibotSchema } from '@ai-sdk/valibot';
import { generateObject, generateText, NoObjectGeneratedError } from 'ai';

const mistral = createMistral({
	apiKey: MISTRAL_API_KEY
});

const visionProvider = mistral('pixtral-large-latest');
const objectProvider = mistral('mistral-large-latest');

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

async function getGameDescription(image: string) {
	return (
		await generateText({
			model: visionProvider,
			temperature: 0,
			abortSignal: AbortSignal.timeout(30_000),
			system:
				'Generate a description of the cards in the image. For example, one card can have two full purple pills. Another example: three striped red diamonds. Another example: one empty green wave. Describe each card with their position (row and column, 0-based). If the center of the items in a card are not definitely white, you should set its filling to `striped`. Choose the color closest to the available options (for example if you see blue, say purple). Clearly describe each card in the image.',
			prompt: [
				{
					role: 'user',
					content: [{ type: 'image', image }]
				}
			]
		})
	).text;
}

async function getCardsFromGameDescription(description: string) {
	return await retryGeneration(
		async () =>
			(
				await generateObject({
					model: objectProvider,
					schema: valibotSchema(setDescriptionSchema),
					output: 'array',
					temperature: 0,
					abortSignal: AbortSignal.timeout(30_000),
					system:
						'Generate a description of the cards from the text description you are given. Choose the color closest to the available options (for example for blue, say purple.',
					prompt: [
						{
							role: 'user',
							content: [{ type: 'text', text: description }]
						}
					]
				})
			).object
	);
}

export async function describeSetGame(image: string) {
	try {
		const description = await getGameDescription(image);
		return await getCardsFromGameDescription(description);
	} catch (e) {
		console.error(e);
		throw new Error('Unable to describe the cards');
	}
}
