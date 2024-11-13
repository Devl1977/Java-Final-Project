// maybe there is a way to do this all in one function where i can do specific searches for popular, upcoming and top rated? looking throug notes and searching
// Based on project constraints we're not getting into any other API sections so just going to focus on popular, upcoming and top rated.
// Because i want to make sure that I can maximize my grade and time spent on perfecting this and trying to get a decent grade
// genres absolutely drove me crazy.  i spent the bulk of my hours working on figureing out how this works but i needed two different calls and to match up the ID's between arrays.
const searchInput = document.getElementById("searchInput");

async function fetchGenres() {
  try 
  {
      //popularMovies = document.getElementById('');
      const DATA_API_URL = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=8ea5d7168687526a85589a1b60fadec2`;

      // https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1
      //console.log(popularMovies);
      // CALL THE API HERE!
      const response = await fetch(DATA_API_URL);
      if (response.ok)
        {
          const data = await response.json()
          return data.genres;
      } else {
        console.error("something went wrong with the 'fetch'")
      }
    
  } catch(error) 
  {
      console.log(error);
  }  
}
// I found out how to do a function for multiple "Types" for popular, top rated and upcoming....
async function fetchData(type) {
    try 
    {
        //popularMovies = document.getElementById('');
        const DATA_API_URL = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1&api_key=8ea5d7168687526a85589a1b60fadec2`;

        // https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1
        //console.log(popularMovies);
        // CALL THE API HERE!
        const response = await fetch(DATA_API_URL);
        if (response.ok)
          {
            const data = await response.json()
            return data.results;
        } else {
          console.error("something went wrong with the 'fetch'")
        }
      
    } catch(error) 
    {
        console.log(error);
    }  
}


// 5 hours later and im hitting a wall but this is what i have 
function getMatchingGenre(genre_id_array, all_genres) {
  // console.log(all_genres)
  const newArray = [];
  for(const genre_id of genre_id_array){
    
    const matchingGenre = all_genres.find(genre_object => genre_object.id === genre_id)
    newArray.push(matchingGenre.name)
  }
  return newArray;
}

const bannerElement = document.getElementById("banner");

function changeBackgroundImage(event) {
  const paragraphElement = event.target;
  const highResImageUrl = paragraphElement.getAttribute('data-url').replace("w220_and_h330_face", "w780");
  console.log("New Banner Image URL:", highResImageUrl); // Check the new URL
  bannerElement.style.backgroundImage = `url(${highResImageUrl})`;
}

function displayMovies(movies, type, genres_array = [], showWatchlistControls = true) {
  const movieContainer = document.getElementsByClassName("grid-container")[0];
  movieContainer.innerHTML = ""; // Clear previous content

  for (const movie of movies) {
    const movieLayer = document.createElement("div");
    movieLayer.setAttribute("class", `movie ${type}`);
    movieLayer.setAttribute("onclick", `changeBackgroundImage(event)`);

    // Image Layer
    const movieImageLayerElement = document.createElement("div");
    movieImageLayerElement.setAttribute("class", "movie-image");
    movieImageLayerElement.setAttribute("style", `background-image: url(https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path});`);
    
    // Description Layer
    const movieDescription = document.createElement("p");
    const movieDescriptionText = document.createTextNode(movie.overview);
    movieDescription.setAttribute("data-url", `https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`);
    movieDescription.append(movieDescriptionText);

    // Watchlist Container (for label and icon) - only if showWatchlistControls is true
    if (showWatchlistControls) {
      const watchlistContainer = document.createElement("div");
      watchlistContainer.classList.add("watchlist-container");

      // Add "Add to Watchlist" label
      const watchlistLabel = document.createElement("span");
      watchlistLabel.classList.add("watchlist-label");
      watchlistLabel.textContent = "Add to Watchlist";
      watchlistContainer.appendChild(watchlistLabel);

      // Watchlist Icon
      const watchlistIcon = document.createElement("span");
      watchlistIcon.classList.add("watchlist-icon");
      watchlistIcon.innerHTML = "&#9733;"; // Star icon
      watchlistIcon.addEventListener("click", (event) => {
        event.stopPropagation();
        addToWatchlist(movie);
      });
      watchlistContainer.appendChild(watchlistIcon);

      // Append the watchlist container to the description
      movieDescription.appendChild(watchlistContainer);
    }

    movieImageLayerElement.append(movieDescription); // Append description to image layer
    movieLayer.append(movieImageLayerElement); // Append image layer to movie layer

    // Movie Info Layer
    const movieInfoLayer = document.createElement("div");
    movieInfoLayer.setAttribute("class", "movie-info");

    // Title
    const movieTitleElement = document.createElement("h1");
    movieTitleElement.textContent = movie.title;
    movieInfoLayer.appendChild(movieTitleElement);

    // Year
    const movieYearElement = document.createElement("p");
    movieYearElement.textContent = new Date(movie.release_date).getFullYear();
    movieInfoLayer.appendChild(movieYearElement);

    // Genres (check if genres_array is available and not empty)
    const movieGenresLayer = document.createElement("p");
    if (genres_array.length > 0) {
      const allGenreNamesArray = getMatchingGenre(movie.genre_ids, genres_array);
      for (const genre of allGenreNamesArray) {
        movieGenresLayer.innerHTML += `${genre} | `;
      }
    }
    movieInfoLayer.appendChild(movieGenresLayer);

    movieLayer.appendChild(movieInfoLayer);
    movieContainer.appendChild(movieLayer); // Add completed movie tile to container
  }
}
// watchlist function
function addToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  
  // Check if movie is already in watchlist
  if (!watchlist.some(watchlistMovie => watchlistMovie.id === movie.id)) {
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert(`${movie.title} has been added to your watchlist!`);
  } else {
    alert(`${movie.title} is already in your watchlist.`);
  }
}
const watchlistButton = document.getElementById("watchlistButton");
watchlistButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevents default anchor behavior
  viewWatchlist(); // Calls the function to display only watchlist items
});

// view watchlist function:
function viewWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  clearMovieGrid(); // Clears any existing movies from the grid
  displayMovies(watchlist, "watchlist", [], false); // Display only movies in the watchlist without controls
}


// im so tired!!!

(async () => {

  const popularMovies = await fetchData("popular");
  const upcomingMovies = await fetchData("upcoming");
  const topRatedMovies = await fetchData("top_rated")
  console.log('topRatedMovies: ', topRatedMovies)
  const movieGenres = await fetchGenres();
  console.log('genres: ', movieGenres)

  displayMovies(upcomingMovies, "upcoming", movieGenres)
  displayMovies(popularMovies, "popular", movieGenres)
  displayMovies(topRatedMovies, "top_rated", movieGenres)


})();


const popularButton = document.getElementById("popular");
const upcomingButton = document.getElementById("upcoming");
const topRatedButton = document.getElementById("top_rated");

const movieTypeHeadline = document.getElementById("movie-type");

popularButton.addEventListener("click", function(event) {
  console.log(document.getElementsByClassName("popular"));
  
  const movieElement = document.querySelector(".movie");
  if (movieElement) {
    movieElement.style.display = "none";
  }

  const popularElement = document.querySelector(".popular");
  if (popularElement) {
    popularElement.style.display = "block";
  }

  movieTypeHeadline.innerHTML = event.target.id;
});

upcomingButton.addEventListener("click", function(event) {
  console.log(document.getElementsByClassName("upcoming"));
  
  const movieElement = document.querySelector(".movie");
  if (movieElement) {
    movieElement.style.display = "none";
  }

  const upcomingElement = document.querySelector(".upcoming");
  if (upcomingElement) {
    upcomingElement.style.display = "block";
  }

  movieTypeHeadline.innerHTML = event.target.id;
});

topRatedButton.addEventListener("click", function(event) {
  console.log(document.getElementsByClassName("top_rated"));
  
  const movieElement = document.querySelector(".movie");
  if (movieElement) {
    movieElement.style.display = "none";
  }

  const topRatedElement = document.querySelector(".top_rated");
  if (topRatedElement) {
    topRatedElement.style.display = "block";
  }

  movieTypeHeadline.innerHTML = event.target.id;
});



async function searchMovie() {
  const query = searchInput.value.trim();
  if (query.length > 0) {
    console.log("Searching for movie:", query); // Log the query to confirm it's being triggered
    const API_KEY = '8ea5d7168687526a85589a1b60fadec2';
    const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`;

    try {
      const response = await fetch(SEARCH_API_URL);
      if (response.ok) {
        const data = await response.json();
        displaySearchResults(data.results);
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error during movie search:", error);
    }
  }
}
// for when someone is hitting enter in the search input box.
searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    searchMovie(); // Trigger the search
  }
});

// Function to display the search results in the grid container
function displaySearchResults(movies) {
  const movieContainer = document.getElementsByClassName("grid-container")[0];
  movieContainer.innerHTML = ""; // Clear previous movies
  
  if (movies.length === 0) {
    movieContainer.innerHTML = "<p>No movies found for the specified query.</p>";
    return;
  }

  movies.forEach(movie => {
    const movieLayer = document.createElement("div");
    movieLayer.classList.add("movie");

    // Image Layer
    const movieImageLayerElement = document.createElement("div");
    movieImageLayerElement.classList.add("movie-image");
    movieImageLayerElement.style.backgroundImage = `url(https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path})`;
    movieLayer.appendChild(movieImageLayerElement);

    // Movie Info Layer
    const movieInfoLayer = document.createElement("div");
    movieInfoLayer.classList.add("movie-info");

    const movieTitleElement = document.createElement("h1");
    movieTitleElement.textContent = movie.title;
    movieInfoLayer.appendChild(movieTitleElement);

    const movieYearElement = document.createElement("p");
    movieYearElement.textContent = new Date(movie.release_date).getFullYear();
    movieInfoLayer.appendChild(movieYearElement);

    const movieDescription = document.createElement("p");
    movieDescription.textContent = movie.overview;
    movieInfoLayer.appendChild(movieDescription);

    movieLayer.appendChild(movieInfoLayer);
    movieContainer.appendChild(movieLayer);
  });
}

function clearMovieGrid() {
  const movieContainer = document.getElementsByClassName("grid-container")[0];
  movieContainer.innerHTML = ""; // Clear previous content
}

// Event listeners for category buttons
popularButton.addEventListener("click", async function () {
  clearMovieGrid();
  const popularMovies = await fetchData("popular");
  const genres = await fetchGenres(); // Fetch genres if needed
  displayMovies(popularMovies, "popular", genres);
});

upcomingButton.addEventListener("click", async function () {
  clearMovieGrid();
  const upcomingMovies = await fetchData("upcoming");
  const genres = await fetchGenres();
  displayMovies(upcomingMovies, "upcoming", genres);
});

topRatedButton.addEventListener("click", async function () {
  clearMovieGrid();
  const topRatedMovies = await fetchData("top_rated");
  const genres = await fetchGenres();
  displayMovies(topRatedMovies, "top_rated", genres);
});


//poster_path
// https://media.themoviedb.org/t/p/w220_and_h330_face
// year released first_air_date
//realease_date
// title
// description
// genre

