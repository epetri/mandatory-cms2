import React, { useState } from 'react';
import { emptyCart } from './store';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './confirmpage.css';

const API = 'http://192.168.99.100:8080/';
const token = 'ad5d4ec915c36e4dbc5016901058c4';

function CheckOut(props) {
  console.log(props);

  const [confirm, updateConfirm] = useState(false);
  const [order, updateOrder] = useState({
    name: '',
    street: '',
    total_price: props.sum,
    products: props.items.map(x => ({ value: x })),
    amount: props.inCart
  });

  function sendOrder(e) {
    e.preventDefault();

    axios
      .post(API + `api/collections/save/orders?token=${token}`, {
        data: order
      })
      .then(response => {
        updateConfirm(true);
        emptyCart();
      });
  }

  function makeOrder(key, e) {
    order[key] = e.target.value;
    updateOrder(order);
  }

  return (
    <>
      {confirm ? (
        <Redirect to='/Confirm' />
      ) : (
        <div className='popUp-container'>
          <div className='popUp-box'>
            <button
              className='closePopup'
              onClick={() => props.updateShowpopup(false)}
            >
              <i className='far fa-times-circle'></i>
            </button>
            <form className='checkout-form' onSubmit={e => sendOrder(e)}>
              <label>
                Name:
                <input
                  className='inputName'
                  type='text'
                  onChange={e => makeOrder('name', e)}
                />
              </label>
              <label>
                street:
                <input
                  className='inputStreet'
                  type='text'
                  onChange={e => makeOrder('street', e)}
                />
              </label>
              <label>
                Postcode:
                <input className='inputStreet' type='text' />
              </label>

              <button className='confirmButton' type='submit'>
                confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckOut;
