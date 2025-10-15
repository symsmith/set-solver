import { form } from '$app/server';
import { baseForm, minDelay } from '$lib/api/utils';
import { solveFormSchema } from '$lib/shared/schemas/solver';

export const solve = form(solveFormSchema, minDelay(baseForm(async () => {})));
