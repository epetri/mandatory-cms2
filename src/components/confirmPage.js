import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './confirmpage.css';

function Confirm(props) {
  const [goHome, updateGohome] = useState(false);

  console.log(props.name);

  return (
    <>
      {goHome ? (
        <Redirect to='/' />
      ) : (
        <div className='config-container'>
          <div>
            <h3>Thank you,</h3>
            <h5>your order has been placed</h5>
          </div>

          <button className='config-button' onClick={() => updateGohome(true)}>
            Go back
          </button>
        </div>
      )}
    </>
  );
}

export default Confirm;
