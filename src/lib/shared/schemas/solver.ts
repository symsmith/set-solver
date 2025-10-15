import * as v from 'valibot';

export const solveFormSchema = v.object({
	image: v.pipe(
		v.file('The file is required'),
		v.mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.'),
		v.maxSize(1024 * 1024 * 10, 'Please select a file smaller than 10 MB.')
	)
});
