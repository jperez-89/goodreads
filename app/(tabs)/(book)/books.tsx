import { ActivityIndicator, FlatList, View } from "react-native";
import { AnimatedCard } from "@/components/AnimatedCard";
import useBook from "@/hooks/useBook";

export default function Books() {
  const { books, loading, getBooks } = useBook();

  return (
    <>
      {
        books.length === 0 ?
          (
            <ActivityIndicator color={"bg-sky-800"} size={"large"} />
          ) :
          (
            <View >
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
            </View>
          )
      }
    </>
  )
}