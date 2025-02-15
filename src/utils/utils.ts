export const getMessageFromError = (error: unknown): string => {
	let message = 'Something went wrong';

	if (typeof error === 'string') {
		message = error;
	} else if (error instanceof Error) {
		message = error.message;
	}

	return message;
};
