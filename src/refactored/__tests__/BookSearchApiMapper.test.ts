import { mapBookSearchApiResponse } from "../BookSearchApiMapper";

describe("mapBookSearchApiResponse", () => {
	it("maps a valid API response item into a book", () => {
		expect(
			mapBookSearchApiResponse(
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
				0,
			),
		).toEqual({
			title: "The Hunger Games",
			author: "Suzanne Collins",
			isbn: "1234567879",
			quantity: 12,
			price: 9.99,
		});
	});

	it("throws when a required field is missing", () => {
		expect(() =>
			mapBookSearchApiResponse(
				{
					book: {
						title: "The Hunger Games",
						author: "Suzanne Collins",
						isbn: undefined as unknown as string,
					},
					stock: {
						quantity: 12,
						price: 9.99,
					},
				},
				1,
			),
		).toThrow("Invalid book search response at item 1: missing book.isbn");
	});
});