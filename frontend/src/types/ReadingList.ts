import { Book } from "@graphql/schema";

export interface ReadingList {
  id: string;
  name: string;
  books: Book[];
}
