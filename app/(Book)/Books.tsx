import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { AnimatedCard } from "@/components/AnimatedCard";
import useBook from "@/hooks/useBook";
import { useSession } from "@/context/aContext";

export default function Books() {
  const { books, loading, getBooks } = useBook();
  const { session } = useSession()
  const { user } = JSON.parse(session);


  return (
    <>
      <Stack.Screen options={{
        headerTitle: `Books - ${user.firstName} ${user.lastName}`,
        animation: 'slide_from_left',
        headerLeft: () => null,
      }} />
      {
        books.length === 0 ?
          (
            <ActivityIndicator color={"bg-sky-800"} size={"large"} />
          ) :
          (
            <FlatList
              onRefresh={getBooks}
              refreshing={loading}
              className="px-4 py-4"
              data={books}
              keyExtractor={(item, index) => `${item._id}-${index}`}
              renderItem={({ item: book, index }) => <AnimatedCard book={book} index={index} />}
              centerContent={true}
              automaticallyAdjustContentInsets={true}
              alwaysBounceVertical={true}
              onEndReached={getBooks}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => {
                if (!loading) {
                  return <ActivityIndicator color={"bg-sky-500"} size={'large'} />;
                }
              }}
            />
          )
      }

    </>
  )
}