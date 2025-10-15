export type RemoteFormReturn =
	| {
			success: boolean;
			error?: undefined;
	  }
	| {
			error: string;
			success?: undefined;
	  };
