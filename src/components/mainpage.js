import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './mainpage.css';

import axios from 'axios';

const API = 'http://192.168.99.100:8080/';

function createList(product) {

  console.log(product);

  return (
    <Link key={product._id} to={'/detailpage/' + product._id}>
      <li>
        <div className='product-div'>
          <img className='product-img' src={API + product.image[0].path} alt='' />
          <h4>{product.name}</h4>
          <h6>{product.price}SEK</h6>
        </div>
      </li>
    </Link>
  );
}

function MainPage() {
  const [products, updateProducts] = useState([]);
  const [total, updateTotal] = useState(0);
  const [page, updatePage] = useState(0);
  const limit = 4;
  const nrOfPages = Math.ceil(total/limit);

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

  function searchFunction(e) {
    
    // let searchVaule = e.target.value;
    // let  = countrys.filter(x => x.toLowerCase().includes(this.state.value.toLowerCase()));
    // console.log(e.target.value);
    
  }

  useEffect(() => {
    const skip = limit * page;
    axios.get(API + `api/collections/get/products?limit=${limit}&skip=${skip}`)
    .then(response => {
      updateProducts(response.data.entries);
      updateTotal(response.data.total);
    });
  }, [page]);

  return (
    <div className='main-container'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <input
      type='text'
      placeholder='Search'
      onChange={e => searchFunction(e)}
      ></input>
      <ul className='main-container-ul'>
        {products.map(product => {
          return createList(product);
        })}
      </ul>
      <p>{page}/{limit}</p>
      <button className='button-increase' onClick={() => decreasePage()}>
        Back
      </button>
      <button className='button-decrease' onClick={() => increasePage()}>
        Next
      </button>
    </div>
  );
}

export default MainPage;
