const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log("API KEY:", API_KEY); 
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query = '') => {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch movies: ${res.statusText}`);
    }

    const data = await res.json();

    return data.results.map((movie) => ({
      id: movie.id,  
      title: movie.title,
      year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : null,
    }));
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};