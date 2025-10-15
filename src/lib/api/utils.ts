function wait(ms = 1000) {
	return new Promise((res) => setTimeout(res, ms));
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
