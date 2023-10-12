const moviesContainer = document.getElementById('movies');
const titleInput = document.getElementById('titleInput');
const yearInput = document.getElementById('yearInput');
const descriptionInput = document.getElementById('descriptionInput');
const addButton = document.getElementById('addButton');

function fetchMovies() {
    fetch('http://localhost:3000/movies')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(movies => {
            moviesContainer.innerHTML = '';
            movies.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie-card');
                movieDiv.innerHTML = `
                    <h2>${movie.title}</h2>
                    <p>Year: ${movie.year}</p>
                    <p>Description: ${movie.description}</p>
                    <button onclick="editMovie(${movie.id})">Edit</button>
                    <button onclick="deleteMovie(${movie.id})">Delete</button>
                `;
                moviesContainer.appendChild(movieDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function addMovie() {
    const title = titleInput.value;
    const year = parseInt(yearInput.value);
    const description = descriptionInput.value;

    if (!title || isNaN(year) || !description) {
        console.error('Invalid input. Please fill in all fields correctly.');
        return;
    }

    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, year, description }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchMovies();
        titleInput.value = '';
        yearInput.value = '';
        descriptionInput.value = '';
    })
    .catch(error => {
        console.error('Error adding movie:', error);
    });
}

function editMovie(id) {
}

function deleteMovie(id) {
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchMovies();
    })
    .catch(error => {
        console.error('Error deleting movie:', error);
    });
}

addButton.addEventListener('click', addMovie);

fetchMovies();
