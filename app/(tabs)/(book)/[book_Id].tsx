import { Animated, Pressable, ScrollView, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import BookDetail from "@/components/Book/BookDetail";
import BookReviewList from "@/components/Book/BookReviewList";
import { useTheme } from "@/theme/ThemeProvider";
import { goBack } from "expo-router/build/global-state/routing";
import { BackIcon } from "@/components/Icons/Icons";
import HeaderRight from "@/components/HeaderRight";
import { useRef, useState } from "react";

const BookId = () => {
  const { theme, toggleTheme } = useTheme();
  const { book_Id } = useLocalSearchParams<{ book_Id: string }>();

  const HEADER_HEIGHT = 60;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [prevScrollY, setPrevScrollY] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = translateY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - prevScrollY;

    if (diff > 5) {
      // Scroll Down - Hide header
      Animated.timing(translateY, {
        toValue: -HEADER_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (diff < -5) {
      // Scroll Up - Show header
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    setPrevScrollY(currentOffset);
  };

  return (
    <>
      <Stack screenOptions={{
        headerShown: false,
      }} />
      <Animated.View className={`flex w-full h-16 ${theme.background.header2}`}
        style={[
          {
            transform: [{ translateY }],
            opacity,
          },
        ]}
      >
        <View className="flex-row items-center justify-between">
          <Pressable className='mx-3' onPress={() => goBack()}>
            <BackIcon color={theme.colors.textWhite} />
          </Pressable>
          <HeaderRight onToggle={toggleTheme} onPress={() => { }} />
        </View>
      </Animated.View >

      < BookDetail id={book_Id} />
      <BookReviewList book_id={book_Id} />
    </>
  )
}

export default BookId