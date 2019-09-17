import React, { useState } from 'react';
import { updateItems } from './store';
import { Redirect } from 'react-router-dom';

function CheckOut(props) {
  const [confirm, updateConfirm] = useState(false);

  function confirmation() {
    updateConfirm(true);
    updateItems();
  }

  return (
    <>
      {confirm ? (
        <Redirect to='/Confirm' />
      ) : (
        <div>
          <button onClick={() => props.updateShowpopup(false)}>close</button>

          <button onClick={() => confirmation()}>confirm</button>
        </div>
      )}
    </>
  );
}

export default CheckOut;
