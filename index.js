const api = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=778d9f8f9085ba1d895fbf7034ec7392&page=1';

const img_init = 'https://image.tmdb.org/t/p/w1280';

// Opening only single double quote (") in search URL so that we can concatenate a search term from the search box 
const search_url = 'https://api.themoviedb.org/3/search/movie?api_key=778d9f8f9085ba1d895fbf7034ec7392&query="'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const homeBtn = document.getElementById('btn');

// Home button
homeBtn.addEventListener('click', () => {
    getMovies(api);
});

getMovies(api);

// Called after Search 
async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();

    showMovies(data.results);
}

// Want to display data on main
function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        // You must look the api result then destrcture the object.
        const { title, poster_path, vote_average, overview } = movie;
        // Ek div create kara 
        const movieEle = document.createElement('div');
        // uski class bhi daal di.
        movieEle.classList.add('movie');
        movieEle.innerHTML = `
        <img src="${img_init + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${ratingColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEle);
    })
}

function ratingColor(val) {
    if(val >= 8) {
        return 'green';
    }
    else if(val >= 5) {
        return 'orange';
    }
    else {
        return 'red';
    }
}


// On Search 
form.addEventListener('submit', (event) => {
    // Default refreshing 
    event.preventDefault(); 
    // Search mein kya enter kiya tha 
    const currentSearch = search.value;

    // If the current search exists(i.e. user typed something) and it is not empty
    if(currentSearch && currentSearch !== '') {
        // Concatenated the url
        getMovies(search_url + currentSearch);
        // clear for next search
        search.value = '';
    }
    else {
        // If user didn't type anything then simply reload the page
        window.location.reload();
    }
})









