import React, { useState } from 'react';
import Styles from './checkout.module.css';
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Checkout = ({ totalAmount }) => {
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState(null);

  const userDataString = localStorage.getItem('data');
  const userData = JSON.parse(userDataString);

  const handleSetProduct = (item) => {
    console.log(item);
    setProduct(item);
  };

  // console.log(product);

  return (
    <div>
      <Navbar />
      <Link to='/cart'>
        {' '}
        <button className={Styles.bkTo_Cart}>Back to cart</button>
      </Link>
      <span className={Styles.cart_heading}>Checkout</span>
      <div className={Styles.container}>
        <div className={Styles.left}>
          <div className={Styles.address}>
            <div className={Styles.left_heading}>1.Delivery address</div>
            {/* {isLoggedIn ? ( */}
            <div>
              <p>{userData.user.name}</p>
              <textArea
                name='textArea'
                id='textArea'
                className={Styles.textArea}
                cols='30'
                rows='10'
                placeholder='104kk hh nagar, LucknowUttar Pradesh 226025'
              ></textArea>
            </div>
            {/* ) : ( '' )} */}
          </div>
          <div className={Styles.pay_method}>
            <div className={Styles.left_heading}>2.Payment method </div>
            <div>
              <select name='payment_methods' className={Styles.pay_type}>
                <option value='' className={Styles.pay_opt}>
                  Mode of payment
                </option>
                <option value='Pay on Delivery' className={Styles.pay_opt}>
                  Pay on Delivery
                </option>
                <option value='UPI' className={Styles.pay_opt}>
                  UPI
                </option>
                <option value='Card' className={Styles.pay_opt}>
                  Card
                </option>
              </select>
            </div>
          </div>
          <div className={Styles.review}>
            <div className={Styles.left_heading}>
              3.Review items and delivery{' '}
            </div>
            <div className={Styles.img_con}>
              {cart?.map((item, index) => (
                <div className={Styles.images}>
                  <div key={index}>
                    <img
                      src={item.image}
                      alt=''
                      className={Styles.productImage}
                      onClick={() => handleSetProduct(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {product && (
              <div className={Styles.productDetails}>
                <p>Brand: {product.brand}</p>
                <p>Color: {product.color}</p>
                <p>In Stock{product.stock}</p>
              </div>
            )}
          </div>
          <div className={Styles.place_ord_Final}>
            <div className={Styles.place_ord_btn}>
              <Link to='/success'>
                {' '}
                <button className={Styles.place_ord}>Place your order</button>
              </Link>
            </div>
            <div className={Styles.place_ord_details}>
              <span>Order Total : </span>
              <span>₹{totalAmount}</span>
              <p
                className={Styles.order_warn1}
                style={{ textAlign: 'left', padding: '0rem' }}
              >
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </div>
          </div>
        </div>
        <div className={Styles.right}>
          <div className={Styles.place_order}>
            <Link to='/success'>
              {' '}
              <button className={Styles.place_ord1}>Place your order</button>
            </Link>
            <p className={Styles.order_warn}>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
            </p>
            <div className={Styles.order_summary}>
              <p>Order Summary</p>
              <div className={Styles.order_Sum}>
                <span>Items : </span>
                <span>₹{totalAmount}</span>
                <span>Delivery : </span>
                <span>₹45.00</span>
              </div>
            </div>
            <div className={Styles.order_total}>
              <p>Order Total : </p>
              <p>₹{totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
