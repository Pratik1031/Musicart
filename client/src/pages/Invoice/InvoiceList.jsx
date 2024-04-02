import React from 'react';
import Navbar from '../../components/Home/Navbar';
import { Link } from 'react-router-dom';
import Styles from './invoice.module.css';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/icons/logo.svg';
import invoiceImage from '../../assets/icons/mdi_invoice-edit.svg';
import cartImg from '../../assets/icons/cart.svg';

const InvoiceList = () => {
  const { isLoggedIn } = useAuth();

  const userDataString = localStorage.getItem('data');
  const userData = JSON.parse(userDataString); // console.log(user);

  return (
    <div>
      <Navbar />
      <div className={Styles.logo}>
        <img src={logo} alt='logo' style={{ width: '10rem', height: '5rem' }} />
        {isLoggedIn && (
          <div className={Styles.isLog}>
            <div className={Styles.routes}>
              <Link to='/'>Home</Link>
              <Link to='/invoiceList'>Invoice</Link>
            </div>
            <div className={Styles.settings}>
              <Link to='/cart'>
                {' '}
                <button className={Styles.cartBtn}>
                  <img src={cartImg} alt='cart' />
                  <span>View Cart</span>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Link to='/cart'>
        <button className={Styles.bkTo_Cart}>Back to cart</button>
      </Link>
      <span className={Styles.cart_heading}>My Invoice</span>

      <div className={Styles.invoicelist}>
        <div className={Styles.details_Container}>
          <img src={invoiceImage} alt='' />
          <div>
            <p>{userData.user.name}</p>
            <p>104 kk hh nagar, Lucknow Uttar Pradesh 226025</p>
          </div>
        </div>

        <div>
          <Link to='/invoice'>
            <button className={Styles.invoiceBtn}>View Invoice</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
