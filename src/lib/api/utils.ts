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
