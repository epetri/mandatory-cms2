import React, { useState } from 'react';
import { emptyCart } from './store';
import { Redirect } from 'react-router-dom';
import './confirmpage.css';

function CheckOut(props) {
  const [confirm, updateConfirm] = useState(false);
  const [name, updateName] = useState('');

  function confirmation() {
    updateConfirm(true);
    emptyCart();
  }

  function saveName(e) {
    updateName(e.target.value);
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
            <form className='checkout-form'>
              <label>
                Name:
                <input className='inputName' type='text' />
              </label>
              <label>
                street:
                <input className='inputStreet' type='text' />
              </label>
              <label>
                Postcode:
                <input className='inputStreet' type='text' />
              </label>
            </form>

            <button className='confirmButton' onClick={() => confirmation()}>
              confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckOut;
