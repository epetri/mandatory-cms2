import React from 'react';
import { Helmet } from 'react-helmet';
import { items$, updateItem, addToCart } from './store';
import { Link } from 'react-router-dom';

const API = 'http://192.168.99.101:8080/';

function shoppingCart() {
  let items = items$.value;

  function createList(item) {
    console.log(item);

    return (
      <Link key={item.product._id} to={'/detailpage/' + item.product._id}>
        <li>
          <div className='item-div'>
            <img className='item-img' src={API + item.product.image[0].path} />
            <h4>{item.product.name}</h4>
            <h6>{item.product.price}</h6>
            <h6>Antal:{item.qty}</h6>
          </div>
        </li>
      </Link>
    );
  }

  return (
    <div className='App'>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <ul>
        {items.map(item => {
          return createList(item);
        })}
      </ul>
    </div>
  );
}

export default shoppingCart;
