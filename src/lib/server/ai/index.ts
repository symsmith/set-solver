import { MISTRAL_API_KEY } from '$env/static/private';
import { setDescriptionGenerationSchema } from '$lib/shared/schemas/solver';
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
				'Generate a description of the cards in the image. For example, one card can have two full purple pills. Another example: three striped red diamonds. Another example: one empty green wave. If the center of the items in a card are not definitely white, you should say its filling is `striped`. If the center of the items in a card are clearly white, say its filling is `empty`. If it is a vivid color, say it is `full`. Choose the color closest to the available options (for example if you see blue, say purple). Clearly describe each card in the image. Describe the cards in the reading order, left to right and top to bottom. If the image does not clearly show a card game, say "This image does not show a card game".',
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
					schema: valibotSchema(setDescriptionGenerationSchema),
					temperature: 0,
					abortSignal: AbortSignal.timeout(30_000),
					system:
						'Generate a description of the cards from the text description you are given. Choose the color closest to the available options (for example for blue, say purple. If the description does not describe a card game, generate an error object with the reason "NOT_CARDS".',
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

class DescriptionError extends Error {
	constructor() {
		super('This image does not clearly show a card game');
	}
}

export async function describeSetGame(image: string) {
	try {
		const description = await getGameDescription(image);
		console.log({ description });
		if (description.includes('image does not show a card game')) {
			throw new DescriptionError();
		}
		const schemaDescription = await getCardsFromGameDescription(description);
		if (Array.isArray(schemaDescription)) {
			return schemaDescription;
		}
		if (schemaDescription.type === 'error' && schemaDescription.reason === 'NOT_CARDS') {
			throw new DescriptionError();
		}
		throw new Error('Could not get cards description');
	} catch (e) {
		if (e instanceof DescriptionError) {
			throw e;
		}
		console.error(e);
		throw new Error('Unable to describe the cards');
	}
}
