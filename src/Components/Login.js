import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/login';

const Login = () => {
  const dispatch = useDispatch();

  //Call function in redux storage to GET token
  useEffect(() => {
    dispatch(login())
  }, [])

  return (
   <div></div>
  );
};

export default Login;
