import React from 'react';
import { useDispatch } from 'react-redux';
import Content from './Components/Content';
import Header from './Components/Header';
import { autoLogin } from './store/login';
import './App.css';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Content />
    </div>
  );
}

export default App;
