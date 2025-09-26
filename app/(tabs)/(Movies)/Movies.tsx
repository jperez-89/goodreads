import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { getMostPopularMovies } from "@/services/metacritics";
import { AnimatedMovieCard } from "@/components/Movie/MovieCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const movies = await getMostPopularMovies();
    setMovies(movies);
  }

  useEffect(() => {
    getMovies()
  }, []);

  return (
    <>
      <View>
        {movies.length === 0 ?
          (
            <ActivityIndicator color={"bg-sky-500"} size={"large"} />
          ) :
          (
            <FlatList
              data={movies}
              keyExtractor={(movie) => movie.slug}
              renderItem={({ item: movie, index }) => <AnimatedMovieCard movie={movie} index={index} />}
              onRefresh={getMovies}
              refreshing={false}
            />
          )}
      </View></>
  )
}
