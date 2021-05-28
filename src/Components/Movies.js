import React from 'react';
import { useDispatch } from 'react-redux';
import { loadNewMovies } from '../store/movies';
import MoviesContent from './MoviesContent';
import MoviesLoadMore from './MoviesLoadMore';

const Movies = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadNewMovies(1));
  }, [dispatch]);

  return (
    <section>
      <MoviesContent />
      <MoviesLoadMore />
    </section>
  );
};

export default Movies;
