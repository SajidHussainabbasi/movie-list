import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../movieAPI';  
import MovieCard from './MovieCard';
import './Movie.css';

const Movie = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const load = async () => {
      setError(null);
      try {
        const results = await fetchMovies(debouncedSearch);
        setMovies(results);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      }
    };
    load();
  }, [debouncedSearch]);

  return (
    <div className="movie-container">
      <h1>🎬 Movie List</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="movie-search"
      />
      <div className="movie-grid">
        {error ? (
          <p className="error">{error}</p>
        ) : movies.length > 0 ? (
         movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Movie;