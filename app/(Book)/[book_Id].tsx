import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BookDetail from "@/components/Book/BookDetail";
import BookReviewList from "@/components/Book/BookReviewList";

export default function bookDescription() {
  const { book_Id } = useLocalSearchParams<{ book_Id: string }>();

  return (
    <>
      <View>
        <BookDetail id={book_Id} />
        <BookReviewList book_id={book_Id} />
      </View>
    </>
  );
}
