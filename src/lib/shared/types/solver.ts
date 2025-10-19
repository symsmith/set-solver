import type { setDescriptionSchema } from '$lib/shared/schemas/solver';
import type { InferOutput } from 'valibot';

export type Card = InferOutput<typeof setDescriptionSchema>;
export type CardSetting = 'count' | 'color' | 'shape' | 'filling';
