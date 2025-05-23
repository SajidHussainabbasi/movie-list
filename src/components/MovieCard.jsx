import React from 'react';
import './MovieCard.css';

const MovieCard = React.memo(({ title, year, poster }) => {
  const imgSrc = poster || 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <div className="movie-card">
      <img
  src={imgSrc}
  alt={title}
  className="movie-poster"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
  }}
/>
      <div>
        <h3>{title}</h3>
        <p>Year: {year}</p>
      </div>
    </div>
  );
});

export default MovieCard;