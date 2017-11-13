export const reduceDirectors = (movies) => {
  const directors = movies.reduce((result, movie) => {
    let count = result[movie.director];
    result[movie.director] = count ? ++count : 1
    return result;
  }, {})
  return directors;
}

export const reduceActors = (movies) => {
  const actors = movies.reduce((result, movie, i, arr) => {
    movie.cast.map(actor => {
      return result[actor] = result[actor] ? ++result[actor] : 1;
    })
    return result;
  }, {})
  return actors;
};
