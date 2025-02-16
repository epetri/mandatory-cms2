import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { addToCart } from './store';
import axios from 'axios';
import './detailpage.css';
import LeaveReview from './leavreview';

const API = 'http://192.168.99.100:8080/';

function getImg(item) {
  return (
    <div className='item-img-container'>
      {item.image.map(image => {
        return <img className='pictures' src={API + image.path} alt='' />; //fixa key
      })}
    </div>
  );
}

function reviewList(review) {
  return (
    <li className='review-li'>
      <h3 className='review-title'>{review.title}</h3>
      <p className='review-body'>{review.body}</p>
      <p className='review-rating'>Betyg: {review.rating} av 5</p>
    </li>
  );
}

function DetailPage({ match }) {
  const [item, updateItem] = useState(null);
  const [amount, updateAmount] = useState(1);
  const [reviews, updateReviews] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(
        API + `api/collections/get/products?filter[_id]=${match.params.id}`
      ),
      axios.get(
        API +
          `api/collections/get/reviews?filter[product._id]=${match.params.id}`
      )
    ]).then(([_item, _reviews]) => {
      updateItem(_item.data.entries[0]);
      updateReviews(_reviews.data.entries);
    });
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
          <div className='imgAndInfo_container'>
            <>{getImg(item)}</>

            <div className='iteminfo-container'>
              <h1 className='item-name'>{item.name}</h1>
              <h3 className='item-price'>{item.price}SEK</h3>
              {item.amount_in_stock <= 3 ? (
                <h5 style={{ color: 'red' }} className='item-amount'>
                  Färre än 3 Kvar!
                </h5>
              ) : (
                <h5 className='item-amount'>{item.amount_in_stock} kvar</h5>
              )}

              <p className='item-description'>{item.description}</p>
              <form
                onSubmit={e => e.preventDefault()}
                className='addItemToCart-Form'
              >
                {' '}
                Antal:
                <input
                  className='amount'
                  type='number'
                  name='qty'
                  min='1'
                  placeholder='amount'
                  value={amount}
                  onChange={e => updateAmount(parseInt(e.target.value))}
                />
                <button
                  className='addToCartButt'
                  type='submit'
                  value='submit'
                  onClick={() => addToCart(item, amount)}
                >
                  Add to shoppingcart
                </button>
              </form>
            </div>
          </div>

          <div className='item-review'>
            <h4 className='item-review-header'>Kundrecensioner</h4>

            <ul className='item-review-ul'>
              {reviews.map(review => {
                return reviewList(review);
              })}
            </ul>
            <LeaveReview review={reviews} updateReviews={updateReviews} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
