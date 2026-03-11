/* Interface */

export interface Book {
	id: string;
	title: string;
	description: string;
	authors: string[];
	categories: string[];
	images: string[];
	publishedDate: string;
	pageCount: number;
}
