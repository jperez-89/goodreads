import { useEffect, useRef } from "react";
import { View, Text, Image, Animated } from "react-native";

export default function MovieCard({ movie }) {
  return (
    <View
      key={movie.slug}
      className="bg-white/95 p-5 my-4 mx-3 rounded-3xl elevation items-center"
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