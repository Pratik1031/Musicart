import React, { useState } from 'react';
import Navbar from '../../components/Home/Navbar';
import logo from '../../assets/icons/logo.svg';
import Styles from './cart.module.css';
import { Link, Navigate } from 'react-router-dom';
import cartImg from '../../assets/icons/cart.svg';
import myCart from '../../assets/icons/mycart.svg';
import Footer from '../../components/Home/Footer';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Cart = ({ setTotalAmount }) => {
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useCart();
  const handleQuantityChange = (event, index) => {
    const newCart = [...cart];
    newCart[index].quantity = parseInt(event.target.value);
    setCart(newCart);
  };

  const calculateTotal = (price, quantity) => {
    const parsedQuantity = parseInt(quantity);
    if (!isNaN(parsedQuantity)) {
      return price * parsedQuantity;
    } else {
      return price;
    }
  };

  const calculateSubTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += calculateTotal(item.price, item.quantity);
      setTotalAmount(total);
    });
    return total;
  };

  const calculateSubTotalWithConvenience = () => {
    return calculateSubTotal() + 45;
  };

  return (
    <>
      <Navbar />
      <div className={Styles.container}>
        <div>
          <div className={Styles.logo}>
            <img
              src={logo}
              alt='logo'
              style={{ width: '10rem', height: '5rem' }}
            />
            <div className={Styles.isLog}>
              <div className={Styles.routes}>
                <Link to='/'>Home</Link>/View Cart
              </div>
              <div className={Styles.settings}>
                <Link to='/cart'>
                  <button className={Styles.cartBtn}>
                    <img src={cartImg} alt='cart' />
                    <span>View Cart</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Link to='/'>
          {' '}
          <button className={Styles.backBtn}>Back to Products</button>
        </Link>

        <div className={Styles.PageTitle}>
          <img src={myCart} alt='' />
        </div>

        <div className={Styles.subContainer}>
          <div className={Styles.details}>
            <div className={Styles.contain}>
              {cart?.map((p, index) => (
                <div className={Styles.subDetails} key={index}>
                  <div>
                    <img src={p.image} alt={p.model} className={Styles.image} />
                  </div>
                  <div className={Styles.name}>
                    <p>{`${p.brand} ${p.model}`}</p>
                    <p>Colour {p.color}</p>
                    <p>{p.in_stock ? 'In Stock' : 'Out oF Stock'}</p>
                  </div>
                  <div className={Styles.price}>
                    <p>Price</p>
                    <p>₹{p.price}</p>
                  </div>
                  <div className={Styles.qty}>
                    <p>Quantity</p>{' '}
                    <select
                      name=''
                      id=''
                      onChange={(event) => handleQuantityChange(event, index)}
                      value={p.quantity}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={Styles.total}>
                    <p>Total</p> <p>₹{calculateTotal(p.price, p.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={Styles.subTotal}>
              <p>{cart?.length} Item</p> <p>₹{calculateSubTotal()}</p>
            </div>
          </div>
          <div className={Styles.summary}>
            <div>
              <p>Price Details </p>
              <p>Total MRP ₹{calculateSubTotal()}</p>
              <p>Discount on MRP 0 </p>
              <p>Convenience Fee 45</p>{' '}
            </div>
            <div>
              <p>Total Amount ₹{calculateSubTotalWithConvenience()}</p>
              {isLoggedIn && (
                <Link to='/checkout'>
                  <button className={Styles.placeBtn}>Place Order</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Cart;
