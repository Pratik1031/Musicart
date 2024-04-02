import React, { useEffect, useState } from 'react';
import home_logo from '../../assets/icons/Home.svg';
import cart_logo from '../../assets/icons/carts.svg';
import invoice_logo from '../../assets/icons/invoice.svg';
import user_logo from '../../assets/icons/user.svg';
import logout_logo from '../../assets/icons/usereLog.svg';
import Styles from './Styles/M_footer.module.css';
import { useNavigate } from 'react-router-dom';

function FooterMob() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const openHome = () => {
    // setIsClicked(true);
    navigate('/');
    // window.location.reload();
  };
  const openCart = () => {
    // setIsClicked(true);
    navigate('/Cart');
  };
  const opennvoice = () => {
    // setIsClicked(true);
    navigate('/Invoice');
  };
  const openlogin = () => {
    // setIsClicked(true);
    navigate('/login');
  };
  useEffect(() => {
    const accessToken = localStorage.getItem('data');
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <div className={Styles.Footer_M}>
      <div className={Styles.logos}>
        <img src={home_logo} alt='' onClick={openHome} />
        <p>Home</p>
      </div>
      <div className={Styles.logos}>
        {' '}
        <img src={cart_logo} alt='' onClick={openCart} />
        <p>cart</p>
      </div>
      {isLoggedIn ? (
        ' '
      ) : (
        <div className={Styles.logos}>
          {' '}
          <img src={invoice_logo} alt='' onClick={opennvoice} />
          <p>invoice</p>
        </div>
      )}
      {isLoggedIn ? (
        <div className={Styles.logos}>
          {' '}
          <img src={logout_logo} alt='' onClick={openlogin} />
          <p>logout</p>
        </div>
      ) : (
        <div className={Styles.logos}>
          {' '}
          <img src={user_logo} alt='' onClick={openlogin} />
          <p>login</p>
        </div>
      )}
    </div>
  );
}

export default FooterMob;
