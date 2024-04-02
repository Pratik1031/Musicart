import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Home/Navbar';
import Banner from '../../components/Home/Banner';
import Searchbar from '../../components/Home/Searchbar';
import Styles from './home.module.css';
import logo from '../../assets/icons/logo.svg';
import Footer from '../../components/Home/Footer';
import HeroSection from '../../components/Home/HeroSection';
import { Link } from 'react-router-dom';
import Main from '../../components/Home/Main';
import ListView from '../../components/Home/ListView';
import axios from 'axios';
import cartImg from '../../assets/icons/cart.svg';
import Feedback from '../../components/Home/Feedback';
import FooterMob from '../../components/Home/FooterMob';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Home = () => {
  const { isLoggedIn } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [initials, setInitials] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState();
  const [cart] = useCart();
  const [viewMode, setViewMode] = useState('grid');

  const handleOpenModal = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      console.log('Please log in to add a card.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
      const { user } = JSON.parse(accessToken);
      const { name } = user;
      setUserName(name);
      const initials = name
        .split(' ')
        .map((name) => name[0])
        .join('');
      setInitials(initials);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('data');
    window.location.reload();
  };

  return (
    <div className={Styles.container}>
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
                  <span>{cart?.length}</span>
                </button>
              </Link>
              <div className={Styles.profile} onClick={handleOpenModal}>
                {initials}
              </div>
            </div>
          </div>
        )}
        {!isLoggedIn && <Link to='/'>Home</Link>}
      </div>
      <div>
        <Banner />
        <div className={Styles.Searchbar}>
          <Searchbar />
        </div>
        <HeroSection
          setFilteredProducts={setFilteredProducts}
          setViewMode={setViewMode}
        />
        {viewMode === 'grid' && (
          <Main
            products={filteredProducts.length > 0 ? filteredProducts : products}
          />
        )}
        {viewMode === 'list' && (
          <ListView
            products={filteredProducts.length > 0 ? filteredProducts : products}
          />
        )}
      </div>
      {isLoggedIn ? <Feedback /> : ''}
      <Footer />
      {/* <FooterMob /> */}
      {showModal ? (
        <div onClick={handleCloseModal} className={Styles.modal}>
          <div className={Styles.modalDetails}>{userName}</div>
          <div className={Styles.modalLine}></div>
          <div className={Styles.modalDetails}>
            <button className={Styles.modalDetails} onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Home;
