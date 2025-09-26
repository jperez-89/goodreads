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
      className={`w-full p-2 rounded-3xl mb-6 elevation ${theme.colors.card}`}>
      <View className="flex-row items-center justify-between">
        <View className="px-2 py-5">
          {loadingImage && <ActivityIndicator className="absolute top-5 left-10 z-10" size="large" color="bg-sky-200" />}

          <Image
            // width={127} height={167}
            className="rounded-2xl w-28 h-56 my-2"
            resizeMode="cover"
            source={book.coverImage ? { uri: book.coverImage } : require("@/assets/no-image.jpg")}
            onLoadEnd={() => setLoadingImage(false)}
          />
        </View>

        <View className="flex-1 justify-center items-start pl-3">
          <Text className={`my-2 text-4xl mr-1 font-bold ${theme.colors.textContent}`}>{book.title}</Text>
          <Text className={`text-xl ${theme.colors.textContent}`}>Autor: {book.author}</Text>
          <Text className={`text-base mr-1 ${theme.colors.textContent}`}>Editorial: {book.publisher}</Text>

          <View className={` my-6 mr-3`}>
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
