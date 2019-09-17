import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { items$, decreaseCart, increaseCart } from './store';
import { Link } from 'react-router-dom';
import './shoppingcart.css';

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
        <li className='cart-item' key={item.product._id}>
          <div className='cart-item-div'>
          <Link key={item.product._id} to={'/detailpage/' + item.product._id}>
            <img className='item-img' src={API + item.product.image[0].path} alt='' />
            <h4 id='item-name'>{item.product.name}</h4>
          </Link>
             <div className='amountItems'>
              <button id='increase' className='amountButtons' onClick={() => increaseCart(item.product)} >
                +
              </button>
              <p>{inCart}</p>
              <button id='decrease' className='amountButtons' onClick={() => decreaseCart(item.product)}>
                -
              </button>
            </div>
            <h4 className='item-totalPrice'>{totalPrice}:-</h4>
            <h5 className='item-stPrice'>({item.product.price}:-)</h5>
          </div>
        </li>
    );
  }

  return (
    <div className='cart-conatiner'>
      <Helmet>
        <title>Home</title>
      </Helmet>
 
      <ul className='cart-ul'>
      <div className='cart-container-headers'>
        <h6>Produkter</h6>
        <h6>Lagerstatus</h6>
        <h6>Antal</h6>
        <h6>Totalt</h6>
      </div>
        {items.map(item => {
          return createList(item);
        })}
      </ul>
    </div>
  );
}

export default ShoppingCart;
