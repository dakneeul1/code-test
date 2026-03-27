export interface BookSearchApiResponse {
	book: {
		title: string;
		author: string;
		isbn: string;
	};
	stock: {
		quantity: number;
		price: number;
	};
}

export interface Book {
    title: string;
    author: string;
    isbn: string;
    quantity: number;
    price: number;
}