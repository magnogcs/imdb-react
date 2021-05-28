import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewMovies } from '../store/movies';
import styles from './MoviesLoadMore.module.css';
import Loading from './Helper/Loading';

const MoviesLoadMore = () => {
  const { pages, infinite, loading } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(loadNewMovies(pages + 1));
  }

  if (loading) return <Loading />;
  if (!infinite) return null;
  return (
    <button onClick={handleClick} className={styles.button}>
      +
    </button>
  );
};

export default MoviesLoadMore;
