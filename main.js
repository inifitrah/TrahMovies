$('.search-button').on('click', function () {
  
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=d6e3fc45&s="+ $('.input-keyword').val(),
    success: (result) => {
      const movies = result.Search;
      let cards = "";
  
      movies.forEach((m) => {
        cards += showCards(m)
      });
      $(".movie-container").html(cards);
  
  
      // ketika detail di klik \
      $(".modal-detail-button").on('click', function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=d6e3fc45&i=" + $(this).data("imdb"),
          success: (m) => {
            const movieDetail = showMovieDetails(m)
            $(".modal-body").html(movieDetail);
          },
          error: (e) => console.log(e.textResponse),
        });
       console.log($(this).data('imdb'))
      });
    },
    error: (e) => console.log(e.textResponse),
  });

})



function showCards(m) {
return  `<div class="col-md-4 my-5">
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