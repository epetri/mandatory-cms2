import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Confirm() {
  const [goHome, updateGohome] = useState(false);
  return (
    <>
      {goHome ? (
        <Redirect to='/' />
      ) : (
        <div>
          <p>confirm</p>
          <button onClick={() => updateGohome(true)}>Go back</button>
        </div>
      )}
    </>
  );
}

export default Confirm;
