import React, { useCallback, useEffect, useState } from 'react';
import Styles from './Styles/hero.module.css';
import grid from '../../assets/icons/grid.svg';
import list from '../../assets/icons/list.svg';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

const HeroSection = ({ setFilteredProducts, setViewMode }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [selectedFilters, setSelectedFilters] = useState({
    headphoneType: '',
    company: '',
    color: '',
    price: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/products/allProduct'
        );
        setProducts(response.data.data);
        // setCart(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = useCallback(async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/products/filter',
        selectedFilters
      );
      setFilteredProducts(response.data.data);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  }, [selectedFilters, setFilteredProducts]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      sort_products: value,
    }));
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters]);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.filters}>
        <div className={Styles.subContainer}>
          <div className={Styles.types}>
            <img
              src={grid}
              alt='grid'
              onClick={() => handleViewModeChange('grid')}
              style={{ cursor: 'pointer' }}
            />
            <img
              src={list}
              alt='list'
              onClick={() => handleViewModeChange('list')}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={Styles.filterby}>
            <select
              name='type'
              id='type'
              className={Styles.filterBtn}
              onChange={handleFilterChange}
            >
              <option value=''>Headphone Type</option>
              <option value=''>Features</option>
              <option value='In-ear'>In-ear headphone</option>
              <option value='On-ear'>On-ear headphone</option>
              <option value='Over-ear'>Over-ear headphone</option>
            </select>
            <select
              name='brand'
              id='brand'
              className={Styles.filterBtn}
              onChange={handleFilterChange}
            >
              <option value=''>Company</option>
              <option value=''>Featured</option>
              {Array.isArray(products) &&
                products.map((product) => (
                  <option key={product.id}>{product.brand}</option>
                ))}
            </select>
            <select
              name='color'
              id='color'
              className={Styles.filterBtn}
              onChange={handleFilterChange}
            >
              <option value=''>Colour</option>
              <option value='Featured'>Featured</option>
              {Array.isArray(products) &&
                products.map((product) => (
                  <option key={product.id}>{product.color}</option>
                ))}
            </select>
            <select
              name='price'
              id='price'
              className={Styles.filterBtn}
              onChange={handleFilterChange}
            >
              <option value=''>Price</option>
              <option value=''>Featured</option>
              <option value='0-100'>₹0 - ₹1,000</option>
              <option value='100-200'>₹1,000 - ₹10,000</option>
              <option value='200-1000'>₹10,000 - ₹20,000</option>
            </select>
          </div>
        </div>
        <div>
          <select
            name='sort_products'
            id='sort_products'
            className={Styles.SortBtn}
            onChange={handleSortChange}
          >
            <option value=''>Sort By : Featured</option>
            <option value='lowest'>Price: Lowest</option>
            <option value='highest'>Price: Highest</option>
            <option value='atoz'>Name:(A-Z)</option>
            <option value='ztoa'>Name:(Z-A)</option>
          </select>
        </div>
      </div>{' '}
    </div>
  );
};

export default HeroSection;
