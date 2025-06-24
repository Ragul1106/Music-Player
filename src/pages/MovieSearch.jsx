import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = 'f6c410e2';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      if (res.data.Response === "True") {
        setMovies(res.data.Search);
        setError('');
      } else {
        setMovies([]);
        setError(res.data.Error);
      }
    } catch (err) {
      setError("Something went wrong.");
      setMovies([]);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    setLoadingDetails(true);
    try {
      const res = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
      if (res.data.Response === "True") {
        setSelectedMovie(res.data);
      }
    } catch {
      setSelectedMovie(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="container py-5"
      style={{ background: 'linear-gradient(135deg, #c3ecf7, #fbe9d7)', borderRadius: '12px' }}
    >
      <motion.h2
        className="text-center text-dark fw-bold mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        🎬 Movie Search
      </motion.h2>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary fw-bold" onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.imdbID}
            className="col-md-4 col-sm-6 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="card glass-card shadow-lg border-0"
              style={{ backdropFilter: 'blur(10px)', borderRadius: '15px', cursor: 'pointer' }}
              onClick={() => fetchMovieDetails(movie.imdbID)}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.Title}
                className="card-img-top"
                style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', height: '400px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">Year: {movie.Year}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedMovie && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header">
                <h5 className="modal-title">{selectedMovie.Title}</h5>
                <button className="btn-close" onClick={() => setSelectedMovie(null)}></button>
              </div>
              <div className="modal-body">
                {loadingDetails ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <div className="row">
                    <div className="col-md-5">
                      <img
                        src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                        className="img-fluid rounded"
                        alt={selectedMovie.Title}
                      />
                    </div>
                    <div className="col-md-7">
                      <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                      <p><strong>Language:</strong> {selectedMovie.Language}</p>
                      <p><strong>Awards:</strong> {selectedMovie.Awards}</p>
                      <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                      <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
                      <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                      <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MovieSearch;
