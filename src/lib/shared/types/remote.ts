export type RemoteFormReturn<T> =
	| {
			success: T;
			error?: undefined;
	  }
	| {
			error: string;
			success?: undefined;
	  };
