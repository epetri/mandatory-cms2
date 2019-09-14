import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './mainpage.css';

import axios from 'axios';

const API = 'http://192.168.99.101:8080/';

function createList(product) {
  return (
    <Link key={product._id} to={'/detailpage/' + product._id}>
      <li>
        <div className='product-div'>
          <img className='product-img' src={API + product.image[0].path} />
          <h4>{product.name}</h4>
          <h6>{product.price}</h6>
        </div>
      </li>
    </Link>
  );
}

function MainPage() {
  const [products, updateProducts] = useState([]);

  useEffect(() => {
    axios.get(API + 'api/collections/get/products').then(response => {
      updateProducts(response.data.entries);
    });
  }, []);

  return (
    <div className='main-container'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <ul className='main-container-ul'>
        {products.map(product => {
          return createList(product);
        })}
      </ul>
    </div>
  );
}

export default MainPage;
