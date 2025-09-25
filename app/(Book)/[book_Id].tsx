import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BookDetail from "@/components/Book/BookDetail";
import BookReviewList from "@/components/Book/BookReviewList";
import { useTheme } from "@/theme/ThemeProvider";

const BookId = () => {
  const { book_Id } = useLocalSearchParams<{ book_Id: string }>();

  return (
    <>
      <BookDetail id={book_Id} />
      <BookReviewList book_id={book_Id} />
    </>
  )
}

export default BookId