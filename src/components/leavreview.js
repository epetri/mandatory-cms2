import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://192.168.99.100:8080/';
const token = 'ad5d4ec915c36e4dbc5016901058c4';

function LeaveReview(props) {
  const [name, updateName] = useState('');
  const [txtarea, updateTxtarea] = useState('');
  const [rating, updateRating] = useState(0);
  const [product, updateProduct] = useState({});

  useEffect(() => {
    props.review.map(x => {
      updateProduct(x);
    });
  }, [sendReview]);

  console.log(product.title);
  console.log(product._id);
  console.log(product);
  function sendReview(e) {
    e.preventDefault();
    console.log(product.title);
    console.log(product._id);
    console.log(product);

    axios
      .post(API + `api/collections/save/reviews?token=${token}`, {
        data: {
          title: name,
          body: txtarea,
          rating: rating,
          product: {
            _id: product.product._id,
            link: 'products',
            display: product.product.title
          }
        }
      })
      .then(response => {
        let copy = [...props.review];
        copy.push(response.data);
        props.updateReviews(copy);
      });
  }

  return (
    <>
      <h4 className='item-review-header'>Skriv ny recension</h4>
      <div className='leaveReview'>
        <form className='leaveReview-form' onSubmit={e => sendReview(e)}>
          <input
            className='leaveReview-name'
            type='text'
            placeholder='Namn'
            onChange={e => updateName(e.target.value)}
          />
          <label>
            Betyg:
            <input
              type='number'
              min='1'
              max='5'
              onChange={e => updateRating(e.target.value)}
            />
          </label>

          <textarea
            onChange={e => updateTxtarea(e.target.value)}
            className='leaveReview-text'
            placeholder='Skriv omdöme'
          />
          <button type='submit' className='leaveReview-button'>
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default LeaveReview;
