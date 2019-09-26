import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { items$, decreaseCart, increaseCart } from './store';
import { Link } from 'react-router-dom';
import CheckOut from './checkOut';
import './shoppingcart.css';

const API = 'http://192.168.99.100:8080/';
let sum = 0;
let inCart;

function ShoppingCart() {
  const [items, updateItems] = useState(items$.value);
  const [showPopup, updateShowpopup] = useState(false);

  useEffect(() => {
    const subscription = items$.subscribe(updateItems);
    return () => subscription.unsubscribe();
  }, []);

  function createList(item) {
    inCart = item.qty;
    let sumItem = item.product.price * inCart;
    sum += sumItem;

    return (
      <li className='cart-item' key={item.product._id}>
        <div className='cart-item-div'>
          <Link key={item.product._id} to={'/detailpage/' + item.product._id}>
            <img
              className='item-img'
              src={API + item.product.image[0].path}
              alt=''
            />
            <h4 id='item-name'>{item.product.name}</h4>
          </Link>
          {item.product.amount_in_stock <= 3 ? (
            <h4 className='amountInStock' style={{ color: 'red' }}>
              Färre än 3 kvar!
            </h4>
          ) : (
            <h4 className='amountInStock'>
              {item.product.amount_in_stock} produkter
            </h4>
          )}
          <div className='amountItems'>
            <button
              id='increase'
              className='amountButtons'
              onClick={() => increaseCart(item.product)}
            >
              +
            </button>
            <p>{inCart}</p>
            <button
              id='decrease'
              className='amountButtons'
              onClick={() => decreaseCart(item.product)}
            >
              -
            </button>
          </div>
          <h4 className='item-totalItemPrice'>{sumItem}:-</h4>
          <h5 className='item-stPrice'>({item.product.price}:-)</h5>
          {/* <i className='fas fa-trash-alt'></i> */}
        </div>
      </li>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className='cartConatiner'>
        {showPopup ? (
          <CheckOut
            inCart={inCart}
            sum={sum}
            updateShowpopup={updateShowpopup}
            items={items}
          />
        ) : null}
        {items$.value ? (
          <>
            <ul className='cart-ul'>
              <div className='cart-container-headers'>
                <h6>Produkter</h6>
                <h6>Lagerstatus</h6>
                <h6>Antal</h6>
                <h6>Pris</h6>
              </div>
              {items.map(item => {
                return createList(item);
              })}
            </ul>
            <div className='cartSum-container'>
              <div className='cartSum-div'>
                <p className='total'> Total slutsumma {sum}SEK</p>
                <button
                  className='checkout'
                  onClick={() => {
                    updateShowpopup(true);
                  }}
                >
                  Check out
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>your shoppingcart is empty</p>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
