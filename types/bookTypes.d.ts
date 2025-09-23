export interface BookTypes {
  _id: string;
  title: string;
  author: string;
  authors: string[];
  isbn: string;
  isbn13: string;
  genres: any[];
  publisher: string;
  publicationDate: string;
  language: string;
  averageRating: number;
  ratingsCount: number;
  reviews: any[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  coverImage: string;
  __v: number;
}

interface BookDetailProps {
  id: string;
  author?: string;
  coverImage?: string;
  title?: string;
  averageRating?: number;
}
