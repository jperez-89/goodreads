import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { getMostPopularMovies } from "@/services/metacritics";
import { AnimatedMovieCard } from "./MovieCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMostPopularMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <>
      <View>
        {movies.length === 0 ?
          (
            <ActivityIndicator color={"#000"} size={"large"} />
          ) :
          (
            <FlatList
              data={movies}
              keyExtractor={(movie) => movie.slug}
              renderItem={({ item: movie, index }) => <AnimatedMovieCard movie={movie} index={index} />} />
          )}
      </View></>
  )
}
