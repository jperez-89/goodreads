import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BookDetail from "@/components/Book/BookDetail";
import BookReviewList from "@/components/Book/BookReviewList";

export default function BookId() {
  const { book_Id } = useLocalSearchParams<{ book_Id: string }>();

  return (
    <View>
      <BookDetail id={book_Id} />
      <BookReviewList book_id={book_Id} />
    </View>
  );
}


// import { View, Text } from 'react-native'
// import React from 'react'

// const BookId = () => {
//   return (
//     <View>
//       <Text>BookId</Text>
//     </View>
//   )
// }

// export default BookId