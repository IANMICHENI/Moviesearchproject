document.getElementById('searchButton').addEventListener('click', searchMovies);
async function searchMovies() {
    const apiKey = 'dc1a2e41';
    const movieName = document.getElementById('searchInput').value.trim();
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieName)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === 'True') {
            const movies = data.Search;
            let output = '';
            for (const movie of movies) {
                const movieDetails = await getMovieDetails(movie.imdbID, apiKey);
                output += generateMovieCard(movieDetails);
            }
            document.getElementById('results').innerHTML = output;
        } else {
            document.getElementById('results').innerHTML = 'No movies found.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function getMovieDetails(movieId, apiKey) {
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}
function generateMovieCard(movieDetails) {
    return `
        <div class="movie-card">
            <h2>${movieDetails.Title}</h2>
            <img src="${movieDetails.Poster}" alt="${movieDetails.Title}">
            <p>Year: ${movieDetails.Year}</p>
            <p>Released: ${movieDetails.Released}</p>
            <p>Actors: ${movieDetails.Actors}</p>
            <p>Ratings: ${movieDetails.Ratings.map(rating => `${rating.Source}: ${rating.Value}`).join(', ')}</p>
            <p>Description: ${movieDetails.Plot}</p>
        </div>
    `;
}
