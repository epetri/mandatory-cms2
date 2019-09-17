import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './mainpage.css';
import axios from 'axios';

const API = 'http://192.168.99.100:8080/';

function createList(product) {
  return (
    <Link className='link' key={product._id} to={'/detailpage/' + product._id}>
      <li>
        <div className='product-div'>
          <img
            className='product-img'
            src={API + product.image[0].path}
            alt=''
          />
          <h4 className='product-name'>{product.name}</h4>
          <h6>{product.price}SEK</h6>
        </div>
      </li>
    </Link>
  );
}

function MainPage(props) {
  const [products, updateProducts] = useState([]);
  const [total, updateTotal] = useState(0);
  const [page, updatePage] = useState(0);
  const limit = 3;
  const nrOfPages = Math.ceil(total / limit);
  let showPage = page + 1;

  function increasePage() {
    if (page === nrOfPages - 1) {
      updatePage(0);
    } else {
      updatePage(page + 1);
    }
  }

  function decreasePage() {
    if (page === 0) {
      updatePage(nrOfPages - 1);
    } else {
      updatePage(page - 1);
    }
  }

  useEffect(() => {
    let regexStock = '';
    if (props.stock) regexStock = '^[1-9]d*';

    const skip = limit * page;
    axios
      .post(API + `api/collections/get/products?limit=${limit}&skip=${skip}`, {
        filter: {
          name: { $regex: props.searchVal },
          amount_in_stock: { $regex: regexStock }
        }
      })
      .then(response => {
        updateProducts(response.data.entries);
        updateTotal(response.data.total);
      });
  }, [page, props.searchVal, props.stock]); //Checkbox

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
      <p className='page'>
        {showPage}/{nrOfPages}
      </p>
      <button className='button-left' onClick={() => decreasePage()}>
        <i className='fas fa-chevron-left'></i>
      </button>
      <button className='button-right' onClick={() => increasePage()}>
        <i className='fas fa-chevron-right'></i>
      </button>
    </div>
  );
}

export default MainPage;
