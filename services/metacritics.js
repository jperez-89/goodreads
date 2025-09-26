export async function getMostPopularMovies() {
  const MOST_POPULAR_MOVIES =
    "https://backend.metacritic.com/finder/metacritic/web?apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u&componentName=movies-carousel&componentDisplayName=Movies&componentType=ProductList&sortBy=-popularityCount&metaScoreMin=1&offset=0&limit=20&mcoTypeId=2";

  const rawData = await fetch(MOST_POPULAR_MOVIES);
  const json = await rawData.json();

  const {
    data: { items },
  } = json;

  return items.map((movie) => {
    const { description, slug, releaseDate, image, criticScoreSummary, title } = movie;
    const { score } = criticScoreSummary;

    // crea la imagen
    const { bucketType, bucketPath } = image;
    const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

    return {
      description,
      releaseDate,
      score,
      slug,
      title,
      image: img,
    };
  });
}

export async function getMovieDetails(slug) {
  const MOVIE_DETAILS = `https://backend.metacritic.com/composer/metacritic/pages/movies/${slug}/web?contentOnly=true&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

  const rawData = await fetch(MOVIE_DETAILS);
  const json = await rawData.json();

  const { components } = json;
  const { title, description, criticScoreSummary, images } = components[0];
  const { score } = criticScoreSummary;

  // get the card image
  const cardImage = images.find((image) => image.typeName === "cardImage");
  const { bucketType, bucketPath } = cardImage;
  const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

  // const rawReviews = components[3].data.items;
  const rawReviews = components[5].data.item.default;
  // const rawReviews = components[5].data.item.positive;
  // const rawReviews = components[5].data.item.negative;
  // const rawReviews = components[5].data.item.neutral;

  // get the reviews
  const reviews = rawReviews.map((review) => {
    const { quote, score, date, publicationName, author } = review;
    return { quote, score, date, publicationName, author };
  });

  return {
    img,
    title,
    slug,
    description,
    score,
    reviews,
  };
}
