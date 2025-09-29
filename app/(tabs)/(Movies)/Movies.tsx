import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { getMostPopularMovies } from "@/services/metacritics";
import { AnimatedMovieCard } from "@/components/Movie/MovieCard";
import CardLoader from "@/components/CardLoader";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getMovies = async () => {
    setRefreshing(true);

    setTimeout(async () => {
      const movies = await getMostPopularMovies();
      setMovies(movies);
      setRefreshing(false);
    }, 2000);
  }

  useEffect(() => {
    getMovies()
  }, []);

  return (
    <>
      <View>
        {movies.length === 0 ?
          (
            [1, 2, 3].map((index) => <CardLoader key={index} />)
          ) :
          (
            <FlatList
              data={movies}
              keyExtractor={(movie) => movie.slug}
              renderItem={({ item: movie, index }) => <AnimatedMovieCard movie={movie} index={index} />}
              onRefresh={getMovies}
              refreshing={refreshing}
              centerContent={true}
              automaticallyAdjustContentInsets={true}
              alwaysBounceVertical={true}
            />
          )}
      </View></>
  )
}
