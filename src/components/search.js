import React from 'react';


function Search(props) {
    function searchField(e){        
        props.updateSearchVal(e.target.value)      
    }

    return (
        <div>
        <input
        type='text'
        value={props.searchVal} 
        placeholder='Search'
        onChange={e => searchField(e)}     
        />
        <input
        type='checkbox'
        onClick={e => props.updateStock(e.target.checked)}
        />
        </div>

        
    )
}

export default Search;