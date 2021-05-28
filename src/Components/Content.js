import React from 'react';
import { useSelector } from 'react-redux';
import Loading from './Helper/Loading';
import Login from './Login';
import Movies from './Movies';

const Content = () => {
  const { user, token } = useSelector((state) => state.login);

  if (user.loading || token.loading) return <Loading />;
  if (user.data) return <Movies />;
  else return <Login />;
};

export default Content;
