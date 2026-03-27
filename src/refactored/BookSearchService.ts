import { BookSearchApiClient } from "./BookSearchApiClient";
import { BookSearchApiConfig } from "./BookSearchApiConfig";
import { mapBookSearchApiResponse } from "./BookSearchApiMapper";
import type { Book, BookSearchApiResponse } from "./types";

export interface BookSearchClient {
	get(url: string, params?: Record<string, unknown>): Promise<BookSearchApiResponse[]>;
}

export class BookSearchService {
	constructor(private readonly apiClient: BookSearchClient = new BookSearchApiClient()) {}

	async getBooksByAuthor(authorName: string, limit: number): Promise<Book[]> {
		if (!BookSearchApiConfig.BOOK_SEARCH_API) {
			throw new Error("Missing BOOK_SEARCH_API_URL environment variable");
		}

        const bookSearchByAuthorUrl = `${BookSearchApiConfig.BOOK_SEARCH_API}/by-author`;

		const response = await this.apiClient.get(bookSearchByAuthorUrl, {
			q: authorName,
			limit,
		});

		if (!Array.isArray(response)) {
			throw new Error("Invalid book search response: expected an array of books");
		}

		return response.map((item, index) => mapBookSearchApiResponse(item, index));
	}
}
