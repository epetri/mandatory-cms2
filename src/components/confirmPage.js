import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './confirmpage.css';

function Confirm(props) {
  const [goHome, updateGohome] = useState(false);

  return (
    <>
      <Helmet>
        <title>Confirm</title>
      </Helmet>
      {goHome ? (
        <Redirect to='/' />
      ) : (
        <div className='config-container'>
          <div>
            <h1>Thank you,</h1>
            <h3>your order has been placed</h3>
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
