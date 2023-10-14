const moviesContainer = document.getElementById('movies');
const titleInput = document.getElementById('titleInput');
const yearInput = document.getElementById('yearInput');
const descriptionInput = document.getElementById('descriptionInput');
const addButton = document.getElementById('addButton');
const homeButton = document.getElementById('homeButton');
const aboutButton = document.getElementById('aboutButton');
const contactsButton = document.getElementById('contactsButton');

function fetchMovies() {
    fetch('https://project-deploy-zoa6.onrender.com/blog')
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

    fetch('https://project-deploy-zoa6.onrender.com/blog', {
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
    fetch(`https://project-deploy-zoa6.onrender.com/blog${id}`)
        .then(response => response.json())
        .then(movie => {
            titleInput.value = movie.title;
            yearInput.value = movie.year;
            descriptionInput.value = movie.description;

            addButton.innerText = 'Save Changes';
            addButton.removeEventListener('click', addMovie);
            addButton.addEventListener('click', () => saveChanges(id));
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}

function saveChanges(id) {
    const editedTitle = titleInput.value;
    const editedYear = parseInt(yearInput.value);
    const editedDescription = descriptionInput.value;

    if (!editedTitle || isNaN(editedYear) || !editedDescription) {
        console.error('Invalid input. Please fill in all fields correctly.');
        return;
    }

    fetch(`https://project-deploy-zoa6.onrender.com/blog${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editedTitle, year: editedYear, description: editedDescription }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        titleInput.value = '';
        yearInput.value = '';
        descriptionInput.value = '';
        addButton.innerText = 'Add Movie';
        addButton.removeEventListener('click', saveChanges);
        addButton.addEventListener('click', addMovie);
        fetchMovies();
    })
    .catch(error => {
        console.error('Error updating movie:', error);
    });
}

function deleteMovie(id) {
    fetch(`https://project-deploy-zoa6.onrender.com/blog${id}`, {
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
