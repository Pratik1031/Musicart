import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './Styles/Navbar.module.css';
import phone_logo from '../../assets/icons/phone.svg';

function Navbar() {
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
      <p className={Styles.phone}>
        <img src={phone_logo} alt='phoneCall' />
        9874563215
      </p>
      <p>Get 50% off on selected items | &nbsp; &nbsp; Shop Now</p>
      {isLoggedIn ? (
        <p></p>
      ) : (
        <div className={Styles.registerBtns}>
          <span>
            <Link to='/register'>Login</Link>
          </span>
          |
          <span>
            <Link to='/register'>Signup</Link>
          </span>
        </div>
      )}
    </div>
  );
}

export default Navbar;
