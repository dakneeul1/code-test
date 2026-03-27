declare const process: {
	env: Record<string, string | undefined>;
};

export const BookSearchApiConfig = {
	BOOK_SEARCH_API: process.env.BOOK_SEARCH_API_URL,
};