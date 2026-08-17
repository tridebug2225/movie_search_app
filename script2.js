const movieInput = document.getElementById("movieInput");
const searchBtn = document.getElementById("searchBtn");
const movieContainer = document.getElementById("movieContainer");

// Replace with your actual

searchBtn.addEventListener("click", searchMovies);

async function searchMovies() {

    const movieName = movieInput.value.trim();

    if (movieName === "") {
        movieContainer.innerHTML = "<p>Please enter a movie name.</p>";
        return;
    }

    movieContainer.innerHTML = "<p>Searching...</p>";

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`
        );

        const data = await response.json();

        if (data.Response === "False") {
            movieContainer.innerHTML = `
                 <p class="error">${data.Error}</p>`;
            return;
        }

        displayMovies(data.Search);

    } catch (error) {

        movieContainer.innerHTML =
            "<p>Something went wrong. Please try again.</p>";

        console.error(error);
    }
    function displayMovies(movies) {

        movieContainer.innerHTML = "";

        movies.forEach(movie => {

            const movieCard = document.createElement("div");

            movieCard.classList.add("movie-card");

            movieCard.innerHTML = `
            <img 
                src="${movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }"
                alt="${movie.Title}"
            >

            <div class="movie-info">

                <h2>${movie.Title}</h2>

                <p>Year: ${movie.Year}</p>

                <p>Type: ${movie.Type}</p>

            </div>
        `;

            movieContainer.appendChild(movieCard);
        });
    }
}