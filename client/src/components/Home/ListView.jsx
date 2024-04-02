import React, { useEffect, useState } from 'react';
import Styles from './Styles/List.module.css';
import AddCart from '../../assets/icons/addCart.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import axios from 'axios';

const ListView = ({ products }) => {
  const { isLoggedIn } = useAuth();
  const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);
  const [cart, setCart] = useCart();
  const [setProducts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/products/allProduct'
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('data');
    if (accessToken) {
      setIsLoggedInLocal(true);
    } else {
      setIsLoggedInLocal(false);
    }
  }, []);

  return (
    <div className={Styles.container}>
      {Array.isArray(products) &&
        products.map((product) => (
          <div key={product._id} className={Styles.card}>
            <Link to={`/productDetails/${product._id}`}>
              <img
                src={product.image}
                alt={product.model}
                className={Styles.productImage}
              />
            </Link>
            <div className={Styles.details}>
              <p>{`${product.brand} ${product.model}`}</p>
              <p>Price - ₹{product.price}</p>
              <p>{`${product.color} | ${product.type}`}</p>
              <p
                className={Styles.desr}
              >{`${product.headline}, ${product.description}`}</p>
              {isLoggedIn || isLoggedInLocal ? (
                <img
                  src={AddCart}
                  alt='Add to Cart'
                  className={Styles.addCart}
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
                />
              ) : (
                ''
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListView;
