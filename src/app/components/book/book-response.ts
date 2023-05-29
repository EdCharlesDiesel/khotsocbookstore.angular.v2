import { Book } from './book';

export interface BookResponse {
    total: number;
    books: Book[];
}
