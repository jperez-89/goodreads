import { useEffect, useState } from "react";
import { ReviewTypes } from "@/types/reviewTypes.d";
import { BookTypes, BookDetailProps } from "@/types/bookTypes";
import { getBookByIdService, getBooksService, addReviewService, getReviewByBookIdService, getMoreReviewByBookIdService } from "@/services/libraries";

const useBook = () => {
  const [books, setBooks] = useState<BookTypes[]>([]);
  const [book, setBook] = useState<BookDetailProps>();
  const [reviews, setReviews] = useState<ReviewTypes[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState("");

  const getBooks = async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    try {
      getBooksService(page).then((books) => {
        setBooks((prevBooks) => [...prevBooks, ...books]);
        setPage((prevPage) => (prevPage + 1));
        // console.warn(books);

        if (books.length === 0) {
          setHasMore(false);
        }
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getBookById = (id: BookDetailProps) => {
    try {
      getBookByIdService(id).then((book) => {
        // console.log("useBook L45 - getBookById", book);
        setBook(book);
      });
    } catch (error) {
      console.error(error);
    }

  }

  const addReview = (bookId: string, title: string, comment: string, rating: number, token: string) => {

    if (!title && !comment && !rating) setError("Complete todos los campos")

    try {
      addReviewService({ bookId, title, comment, rating, token }).then((newReview) => {
        // console.log("useBook L59 - addReview", newReview);
        setReviews(newReview);
        setError("")
        // setReviews((prevReviews) => [...prevReviews, newReview]);

        // getReviewByBookId(bookId)

        setShowModal(false)
      });
    } catch (error) {
      console.error(error);
    }
  }

  const getReviewByBookId = (book_id: string) => {
    try {
      setLoading(true);

      getReviewByBookIdService({ book_id }).then((review) => {
        // console.warn("useBook L77 - getReviewByBookId", review.length);
        setReviews(review);
        setPage(2);
        setHasMore(review.length > 1);
      });
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  const getMoreReviewByBookId = (book_id: string, page: number) => {
    try {
      if (isLoadingMore || !hasMore) {
        return;
      }
      setIsLoadingMore(true);

      getMoreReviewByBookIdService({ book_id, page }).then((review) => {
        setReviews((prevReviews) => [...prevReviews, ...review]);
        setPage((prevPage) => prevPage + 1);

        if (review.length === 0) {
          setHasMore(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoadingMore(false);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  return { books, book, loading, isLoadingMore, getBooks, getBookById, showModal, setShowModal, addReview, reviews, setReviews, getReviewByBookId, getMoreReviewByBookId, page, hasMore, error };
};

export default useBook;
