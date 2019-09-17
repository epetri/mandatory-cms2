import React from 'react';
import '../App.css';

function Search(props) {
  function searchField(e) {
    props.updateSearchVal(e.target.value);
  }

  return (
    <div>
      <label className='checkbox'>
        In stock
        <input
          type='checkbox'
          onClick={e => props.updateStock(e.target.checked)}
        />
      </label>
      <label>
        <input
          className='searchField'
          type='text'
          value={props.searchVal}
          placeholder='Search'
          onChange={e => searchField(e)}
        />
      </label>
    </div>
  );
}

export default Search;
