import { BookSearchApiConfig } from "../BookSearchApiConfig";
import { BookSearchService, type BookSearchClient } from "../BookSearchService";
import { jest } from "@jest/globals";
import type { BookSearchApiResponse } from "../types";

describe("BookSearchService", () => {
	const originalApiUrl = BookSearchApiConfig.BOOK_SEARCH_API;

	afterEach(() => {
		BookSearchApiConfig.BOOK_SEARCH_API = originalApiUrl;
		jest.clearAllMocks();
	});

	it("fetches books by author and maps the API response", async () => {
		BookSearchApiConfig.BOOK_SEARCH_API = "https://books.example.com";

		const get = jest
			.fn<(url: string, params?: Record<string, unknown>) => Promise<BookSearchApiResponse[]>>()
			.mockResolvedValue([
			{
				book: {
					title: "The Hunger Games",
					author: "Suzanne Collins",
					isbn: "1234567879",
				},
				stock: {
					quantity: 12,
					price: 9.99,
				},
			},
			]);

		const apiClient: BookSearchClient = { get };
		const service = new BookSearchService(apiClient);

		await expect(service.getBooksByAuthor("Suzanne Collins", 5)).resolves.toEqual([
			{
				title: "The Hunger Games",
				author: "Suzanne Collins",
				isbn: "1234567879",
				quantity: 12,
				price: 9.99,
			},
		]);

		expect(get).toHaveBeenCalledWith("https://books.example.com/by-author", {
			q: "Suzanne Collins",
			limit: 5,
		});
	});
});