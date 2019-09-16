import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { items$, decreaseCart, increaseCart } from './store';
import { Link } from 'react-router-dom';

const API = 'http://192.168.99.100:8080/';

function ShoppingCart() {

  const [items, updateItems] = useState(items$.value);

  useEffect(() => {
    const subscription = items$.subscribe(updateItems);
    return () => subscription.unsubscribe();
  }, []);

  function createList(item) {
    let inCart = item.qty;
    let totalPrice = item.product.price * inCart;

    return (
        <li>
          <div className='item-div'>
          <Link key={item.product._id} to={'/detailpage/' + item.product._id}>

            <img className='item-img' src={API + item.product.image[0].path} alt='' />
            </Link>

            <h4>{item.product.name}</h4>
            <h6>{item.product.price}SEK</h6>
            <div className='amountItems'>
              <button className='increase' onClick={() => increaseCart(item.product)} >
                +
              </button>
              <p>{inCart}</p>
              <button className='decrease' onClick={() => decreaseCart(item.product)}>
                -
              </button>
              <h2>Total {totalPrice}SEK</h2>
            </div>
          </div>
        </li>
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

export default ShoppingCart;
