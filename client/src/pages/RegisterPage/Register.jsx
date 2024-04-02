import React, { useEffect, useState } from 'react';
import Styles from './register.module.css';
import Login from '../../components/Register/Login/Login';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('data');

    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className={Styles.container}>
      {isLoggedIn ? <Navigate to='/' /> : <Login />}
    </div>
  );
};

export default Register;
