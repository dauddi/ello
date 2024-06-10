/**
 * TODO: Use codegen to generate grapgql schema from backend service
 */

export interface Book {
  __typename: string;
  id: string;
  title: string;
  author: string;
  readingLevel: string;
  coverPhotoURL: string;
}
