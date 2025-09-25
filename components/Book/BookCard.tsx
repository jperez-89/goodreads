import { useState } from "react";
import { Link } from "expo-router";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

interface BookCardItemProps {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  publisher: string;
  genres: string[];
  averageRating: number;
}

export const BookCard: React.FC<{ book: BookCardItemProps }> = ({ book }) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const { theme } = useTheme();

  return (
    <Link
      href={`/${book._id}`}
      // href={{ pathname: "/[book_Id]", params: { id: book._id } }}
      key={book._id}
      className={`rounded-3xl mb-6 elevation-md ${theme.colors.card}`}>
      <View className="flex-row items-start justify-between">
        <View className="relative justify-center items-center w-28 h-56 m-2">
          {loadingImage && <ActivityIndicator className="absolute top-5 left-10 z-10" size="large" color="bg-sky-200" />}

          <Image
            className="rounded-2xl w-28 h-56"
            resizeMode="cover"
            source={book.coverImage ? { uri: book.coverImage } : require("@/assets/no-image.jpg")}
            onLoadEnd={() => setLoadingImage(false)}
          />
        </View>

        <View className="flex-1 justify-center items-start pl-3 pt-3">
          <Text className={`my-2 text-4xl mr-1 font-bold ${theme.colors.textContent}`}>{book.title}</Text>
          <Text className={`text-xl ${theme.colors.textContent}`}>Autor: {book.author}</Text>
          <Text className={`text-base flex-shrink mr-1 ${theme.colors.textContent}`}>Editorial: {book.publisher}</Text>

          <View className={`flex-shrink my-6 mr-3`}>
            <Text className={`font-bold text-base`} >
              Generos:{" "}
              {book.genres.map((g, index) => (
                <Text className={`text-sm font-normal`} key={index}>
                  {g}
                  {index === book.genres.length - 1 ? "." : ","}
                </Text>
              ))}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
}
