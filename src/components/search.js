import React from 'react';
import '../App.css';

function Search(props) {
  function searchField(e) {
    props.updateSearchVal(e.target.value);
  }

  return (
    <div>
      <input
        className='searchField'
        type='text'
        value={props.searchVal}
        placeholder='Search'
        onChange={e => searchField(e)}
      />
      <input
        className='checkbox'
        type='checkbox'
        onClick={e => props.updateStock(e.target.checked)}
      />
    </div>
  );
}

export default Search;
