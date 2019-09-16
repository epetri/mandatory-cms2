import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { addToCart } from './store';

import axios from 'axios';
import './detailpage.css';

const API = 'http://192.168.99.100:8080/';

function getImg(item) {
  return (
    <div key={item._id} className='item-img-container'>
      {item.image.map(image => {
        return <img className='item-img' src={API + image.path} alt='' />; //fixa key
      })}
    </div>
  );
}

function reviewList (review) {
  return(
    <li>
      <h5>{review.title}</h5>
      <p>{review.body}</p>
      <p>{review.rating}</p>

    </li>
  )
}

function DetailPage({ match }) {
  const [item, updateItem] = useState(null);
  const [amount, updateAmount] = useState(1);
  const [reviews, updateReviews] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(API + `api/collections/get/products?filter[_id]=${match.params.id}`),
      axios.get(API + `api/collections/get/reviews?filter[product._id]=${match.params.id}`)
    ])
      .then(([_item, _reviews]) => {
        updateItem(_item.data.entries[0]);
        updateReviews(_reviews.data.entries);
      })
  }, [match.params.id]);


  return (
    <div className=''>
      <Helmet>
        <title>Details</title>
      </Helmet>
      {!item ? (
        <p>Loading...</p>
      ) : (
        <div className='item-container'>
          <>{getImg(item)}</>
          <div className='iteminfo-container'>
            <h1 className='item-name'>{item.name}</h1>
            <h3 className='item-price'>{item.price}SEK</h3>
            <h3 className='item-amount'>{item.amount_in_stock}st</h3>
            <p className='item-description'>{item.description}</p>
          </div>
          <div className='item-review'>
            <ul>
            {reviews.map(review => {
              return reviewList(review);
            })}
            </ul>
          </div>
          <form
            onSubmit={e => e.preventDefault()}
            className='addItemToCart-Form'
          >
            <input
              type='number'
              name='qty'
              min='1'  
              placeholder='amount'
              value={amount}
              onChange={e => updateAmount(parseInt(e.target.value))}
            />
            <button
              type='submit'
              value='submit'
              onClick={() => addToCart(item, amount)}
            >
              Add to shoppingcart
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
