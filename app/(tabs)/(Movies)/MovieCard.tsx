import { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, Animated } from "react-native";

export default function MovieCard({ movie }) {
  return (
    <View
      key={movie.slug}
      className="bg-white/95 p-5 my-4 mx-3 rounded-3xl elevation-sm items-center"
    >
      <Text className="text-3xl font-bold mb-5">{movie.title}</Text>
      <Image width={127} height={167} source={{ uri: movie.image }} className="rounded-xl w-96 h-56" />
      <Text className="my-1 text-xl text-green-600 font-semibold">
        Score: {movie.score}
      </Text>
      <Text className="mx-1 mt-1 text-justify color-gray-600 text-base leading-relaxed">
        {movie.description.slice(0, 250)}...
      </Text>
    </View>
  );
}

export function AnimatedMovieCard({ movie, index }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        delay: index * 250,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 8,
        delay: index * 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale, index]);

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <MovieCard movie={movie} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 380,
    padding: 10,
    marginBottom: 42,
    backgroundColor: "#e0dbdbd7",
    borderRadius: 35,
  },

  image: {
    marginHorizontal: 125,
    width: 127,
    height: 167,
    borderRadius: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#131212ce",
    marginTop: 10,
  },

  description: {
    marginHorizontal: 8,
    paddingBottom: 10,
    fontSize: 16,
    textAlign: "justify",
    color: "#464141ff",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
});
