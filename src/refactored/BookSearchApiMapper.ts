import type { Book, BookSearchApiResponse } from "./types";

function assertPresent<T>(value: T | null | undefined, fieldPath: string, index: number): T {
	if (value === null || value === undefined) {
		throw new Error(`Invalid book search response at item ${index}: missing ${fieldPath}`);
	}

	return value;
}

export function mapBookSearchApiResponse(item: BookSearchApiResponse | null | undefined, index: number): Book {
	const responseItem = assertPresent(item, "item", index);
	const book = assertPresent(responseItem.book, "book", index);
	const stock = assertPresent(responseItem.stock, "stock", index);

	return {
		title: assertPresent(book.title, "book.title", index),
		author: assertPresent(book.author, "book.author", index),
		isbn: assertPresent(book.isbn, "book.isbn", index),
		quantity: assertPresent(stock.quantity, "stock.quantity", index),
		price: assertPresent(stock.price, "stock.price", index),
	};
}