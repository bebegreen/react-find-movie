

export function getMovies() {

  return fetch('http://localhost:3000/movies')
    .then(res => res.json())
    .catch(err => err);
}

export function MovieData(id) {
  return fetch(`http://localhost:3000/movies/${id}`)
    .then(res => res.json())
    .catch(err => err);
}

export function deleteMovie(id) {
  return fetch(`http://localhost:3000/movies/${id}`, { method: 'delete' })
    .then(res => res.json())
    .catch(err => err);
}

export function postMovie(movie) {
  let headers = new Headers({ "Content-Type": "application/json" })
  return fetch(`http://localhost:3000/movies`,
    { method: 'post', body: JSON.stringify(movie), headers: headers })
    .then(res => res.json())
    .catch(err => err);
}

export function editMovie(movie, id) {
  let headers = new Headers({ "Content-Type": "application/json" })
  return fetch(`http://localhost:3000/movies/${id}`,
    { method: 'put', body: JSON.stringify(movie), headers: headers })
    .then(res => res.json())
    .catch(err => err);
}

export function getTrailer(name) {

  return gapi.client.request({
    'path': `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name} trailer&maxResults=1`,

  }).then(function (response) {
    return response.result.items[0].id.videoId;
  }, function (reason) {
    console.log('Error: ' + reason.result.error.message);
  });

}





