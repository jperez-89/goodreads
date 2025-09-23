import { useTheme } from "@/theme/ThemeProvider";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

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
      style={{ ...styles.card, backgroundColor: theme.colors.card }}
      className="rounded-2xl bg-sky-50 mb-6 ">
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          {loadingImage && <ActivityIndicator size="large" color="bg-sky-500" style={styles.loader} />}
          <Image
            resizeMode="cover"
            source={book.coverImage ? { uri: book.coverImage } : require("@/assets/no-image.jpg")}
            style={styles.image}
            onLoadEnd={() => setLoadingImage(false)}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ ...styles.title, color: theme.colors.primary }}>{book.title}</Text>
          <Text style={{ ...styles.author, color: theme.colors.textContent }}>Autor: {book.author}</Text>
          <Text style={{ ...styles.publisher, color: theme.colors.textContent }}>Editorial: {book.publisher}</Text>

          <View style={styles.genres}>
            <Text style={{ ...styles.textGenres, color: theme.colors.textContent }}>
              Generos:{" "}
              {book.genres.map((g, index) => (
                <Text style={{ ...styles.genre, color: theme.colors.textContent }} key={index}>
                  {g}
                  {", "}
                </Text>
              ))}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    // backgroundColor: theme.colors.background,
    marginBottom: 24,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 9,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 224,
  },
  loader: {
    position: "absolute",
    top: "40%",
    left: "25%",
    zIndex: 2,
  },
  image: {
    width: 100,
    height: 180,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
    marginTop: 7,
  },
  author: {
    fontSize: 16,
    color: "#059669",
    fontWeight: "600",
  },
  publisher: {
    fontSize: 15,
    color: "#555",
    fontWeight: "bold",
  },
  genres: {
    flexShrink: 5,
    marginTop: 18,
    marginRight: 15,
  },
  textGenres: {
    fontSize: 15,
    color: "#555",
    fontWeight: "bold",
    textAlign: "left",
  },
  genre: {
    fontSize: 14,
    color: "#555",
    fontWeight: "semibold",
    textAlign: "left",
  },
});
