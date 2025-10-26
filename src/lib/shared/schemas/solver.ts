import * as v from 'valibot';

export const solveFormSchema = v.object({
	image: v.pipe(
		v.file('The file is required'),
		v.mimeType(['image/jpeg', 'image/png'], 'Please upload a JPEG or PNG file.'),
		v.maxSize(1024 * 1024 * 30, 'Please upload a file smaller than 30 MB.')
	)
});

export const setDescriptionSchema = v.object({
	count: v.union([v.literal(1), v.literal(2), v.literal(3)]),
	color: v.union([v.literal('purple'), v.literal('red'), v.literal('green')]),
	shape: v.union([v.literal('pill'), v.literal('diamond'), v.literal('wave')]),
	filling: v.union([v.literal('full'), v.literal('striped'), v.literal('empty')])
});

export const setDescriptionGenerationSchema = v.union([
	v.array(setDescriptionSchema),
	v.object({
		type: v.literal('error'),
		reason: v.literal('NOT_CARDS')
	})
]);
