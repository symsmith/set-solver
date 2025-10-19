import type { setDescriptionSchema } from '$lib/shared/schemas/solver';
import type { InferOutput } from 'valibot';

export type Card = InferOutput<typeof setDescriptionSchema>;
