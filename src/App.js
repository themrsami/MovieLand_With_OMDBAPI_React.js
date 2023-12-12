import React from 'react';
import { useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import { useState } from 'react';

const API_URL = 'https://omdbapi.com?apikey=272663e8';

const movie1 =
    {
        "Title": "Harry Potter and the Goblet of Fire",
        "Year": "2005",
        "imdbID": "tt0330373",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg"
    };


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const res = await fetch(`${API_URL}&s=${title}`);
        const resData = await res.json();
        setMovies(resData.Search);
    }
    useEffect(() => {
        searchMovies('Harry Potter');
    }, []);
  return (
    <div className='app'>
        <h1>MovieLand</h1>
        <div className='search'>
            <input 
                type='text' 
                placeholder='Search...' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <img 
                src={SearchIcon}
                alt='Search'
                onClick={() => searchMovies(searchTerm)}
            />
        </div>
        {
            movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found!</h2>
                </div>
            )
        }
    </div>
  );
}

export default App;