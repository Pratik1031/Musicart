import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Home/Footer';
import styles from './sucess.module.css';
import hurray from '../../assets/icons/hurray.svg';
import logo from '../../assets/icons/logo.svg';
import FooterMob from '../../components/Home/FooterMob';
import { useCart } from '../../context/CartContext';

const SucessPage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const openHome = () => {
    navigate('/');
    setCart([]);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <img src={logo} alt='logo' className={styles.logo} />
      <div className={styles.success}>
        <img src={hurray} alt='hurray' style={{ height: '8rem' }} />
        <h3>Order is placed successfully!</h3>
        <p>You will be receiving a confirmation email with order details</p>
        <button className={styles.sucessBtn} onClick={openHome}>
          Go back to Home page
        </button>
      </div>
      {isMobile && <FooterMob />}
      {!isMobile && <Footer />}
    </div>
  );
};

export default SucessPage;
