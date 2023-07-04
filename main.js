const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', async function () {
  try {
    
    const inputKeyword = document.querySelector('.input-keyword')
    const movies = await getMovies(inputKeyword.value)
    updateUI(movies)

  } catch (eror) {
    alert(eror)
  }

})


document.addEventListener('click', async function (e) {
  try {
    if (e.target.classList.contains('modal-detail-button')) {
      const imdbID = e.target.dataset.imdb
      const movieDetail = await getMoviesDetail(imdbID)
      updateUIDetail(movieDetail)
    }
  } catch (eror) {
    alert(eror)
  }
})


function getMoviesDetail(imdbID) {
  return fetch("https://www.omdbapi.com/?apikey=d6e3fc45&i=" + imdbID)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json();
    })
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetails(m)
  const modalBody = document.querySelector('.modal-body')
  modalBody.innerHTML = movieDetail
}


function getMovies(keyword) {
    return fetch("https://www.omdbapi.com/?apikey=d6e3fc45&s=" + keyword)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json();
      })
      .then(response => {
        if (response.Response === "False") {
          throw new Error(response.Error);
        }
        return response.Search;
      })
}

function updateUI(movies) {
  let cards = "";
  movies.forEach(m => {
    cards += showCards(m)
    const movieContainer = document.querySelector('.movie-container')
    movieContainer.innerHTML = cards
  })
}

function showCards(m) {
return `<div class="col-md-4 my-5 d-flex justify-content-center">
          <div class="card" style="width: 18rem">
            <img src="${m.Poster}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
             <button type="button" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdb="${m.imdbID}" >
             Details
            </button>
            </div>
          </div>
        </div>`;
}

function showMovieDetails(m) {
 return `<div class="container">
          <div class="row">
            <div class="col-md-3">
              <img src="${m.Poster}" class="img-fluid">
            </div>
            <div class="col-md">
              <ul class="list-group">
              <li class="list-group-item"><h4>${m.Title}(${m.Year})</h4></li>
              <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
              <li class="list-group-item"><strong>actors: </strong> ${m.Actors}</li>
              <li class="list-group-item"><strong>writer: </strong>${m.Writer}</li>
              <li class="list-group-item"><strong>plot: </strong>${m.Plot}</li>
            </ul>
            </div>
          </div>
        </div>`;
}