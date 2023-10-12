### Movie Search Database Project

### Editor
##**Ian Mwenda M **

## Project Description
 Movie Database Project is a Single Page Application that enables users to search for movies using the OMDB API.
 Users can input movie names in the search bar and view detailed information about the movies, including actors, release date, ratings, and descriptions.
 
 ## How To Use
1.Clone the Repository:
        Clone the project repository from GitHub to your local machine.
2.Obtain OMDB API Key:
        Get an API key from OMDB API.
        Replace the apiKey variable in index.js with your API key.
3.Install and Run JSON Server:
        Install JSON Server globally: npm install -g json-server
        Create a db.json file in your project with movie data.
        Start JSON Server: json-server --watch db.json --port 3000
4.Run the Application:
        Open index.html in your web browser.
        Enter movie names and click "Search" to get movie details.


## API Usage
This project uses the OMDB API to fetch movie data.
Make sure to obtain an API key from [OMDB](http://www.omdbapi.com/) and replace the `apiKey` variable in `index.js` with your API key.

## Known Bugs
1. API Key Exposure: Security risk due to hardcoded API key.
2. Handling API Responses: Inadequate error validation risks crashes.
3. Mixed Content Issues: HTTPS-HTTP conflict may block requests.

## Technologies used
    - JS
    - HTML 
    - CSS
    - OMDB API

## Support and contact details
    - email :: ianmwenda@gmail.com
    - phone :: +25422222222

## License
*Licenced under the MIT Licence
Copyright (c) 2023 **Ian Mwenda M
