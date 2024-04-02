import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Home/Navbar';
import logo from '../../assets/icons/logo.svg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Styles from './ProductDetails.module.css';
import Cart from '../../assets/icons/cart.svg';
import Footer from '../../components/Home/Footer';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ProductDetails = () => {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products/productDetails/${id}`
        );
        const data = response.data.data;
        // console.log(data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const addToCart = () => {
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const buyNow = () => {
    addToCart();
  };

  if (!product) {
    return <div>Loading...</div>;
  }

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
            {isLoggedIn && (
              <div className={Styles.isLog}>
                <div className={Styles.routes}>
                  <Link to='/'>Home</Link>/
                  <span>{`${product.brand} ${product.model}`}</span>
                </div>
                <div className={Styles.settings}>
                  <Link to='/cart'>
                    <button className={Styles.cartBtn}>
                      <img src={Cart} alt='cart' />
                      <span>View Cart</span>
                      <span>{cart?.length}</span>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <Link to='/'>
          {' '}
          <button className={Styles.backBtn}>Back to Products</button>
        </Link>

        <div className={Styles.subContainer}>
          <div className={Styles.ProductHeadline}>{product.headline}</div>
          <div className={Styles.ProductDetails}>
            <div className={Styles.ProductImages}>
              <div>
                <img src={product.image} alt='' className={Styles.MainImage} />
              </div>
              <div className={Styles.SubImagesContainer}>
                {product.images && product.images.length >= 3 && (
                  <>
                    {product.images &&
                      product.images
                        .slice(0, 3)
                        .map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt=''
                            className={Styles.SubImages}
                          />
                        ))}
                  </>
                )}
              </div>
            </div>
            <div className={Styles.ProductDescription}>
              <div>
                <h2>{`${product.brand} ${product.model}`}</h2>
                <p className={Styles.review}>{product.review}</p>
                <p>Price -₹{product.price}</p>
                <p>{`${product.color} | ${product.type}`}</p>
                <ul className={Styles.description}>
                  About this item
                  <li> {product.description}</li>
                  <li> {product.description}</li>
                </ul>
                <p>
                  Available - {product.in_stock ? 'In Stock' : 'Out OF Stock'}
                </p>
                <p>Brand - {product.brand}</p>
              </div>
              <div className={Styles.btns}>
                <Link to='/cart'>
                  {' '}
                  <button
                    className={Styles.add}
                    onClick={() => {
                      const existingProductIndex = cart.findIndex(
                        (item) => item._id === product._id
                      );
                      if (existingProductIndex !== -1) {
                        const updatedCart = [...cart];
                        updatedCart[existingProductIndex].quantity += 1;
                        setCart(updatedCart);
                      } else {
                        setCart([...cart, { ...product, quantity: 1 }]);
                      }
                    }}
                  >
                    Add to cart
                  </button>
                </Link>
                <Link to='/cart'>
                  <button className={Styles.buy} on onClick={addToCart}>
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
