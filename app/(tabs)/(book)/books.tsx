import { ActivityIndicator, Animated, FlatList, Text, View } from "react-native";
import { AnimatedCard } from "@/components/AnimatedCard";
import useBook from "@/hooks/useBook";
import { useTheme } from "@/theme/ThemeProvider";
import { useRef, useState } from "react";
import HeaderRight from "@/components/HeaderRight";

export default function Books() {
  const { books, loading, getBooks } = useBook();
  const { toggleHeader } = useTheme();

  const onScroll = (event) => {
    const positionY = event.nativeEvent.contentOffset.y;

    if (positionY > 0) {
      toggleHeader(false)
      return false
    } else {
      toggleHeader(true)
      return true
    }
  };

  return (
    <>
      {
        books.length === 0 ?
          (
            <ActivityIndicator color={"bg-sky-800"} size={"large"} />
          ) :
          (
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
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
                    return <ActivityIndicator color={"bg-sky-500"} size={"large"} />;
                  }
                }}
              />
            </View>
          )
      }
    </>
  )
}