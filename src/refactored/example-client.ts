import { BookSearchService } from "./BookSearchService";

async function main(): Promise<void> {
	const bookSearchService = new BookSearchService();
	const books = await bookSearchService.getBooksByAuthor("Shakespeare", 10);

	console.log(books);
}

main().catch((error: unknown) => {
	console.error("Failed to fetch books", error);
});
