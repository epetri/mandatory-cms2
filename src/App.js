import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import { items$, updateItem, addToCart } from '../src/components/store';
import Mainpage from './components/mainpage';
import Detailpage from './components/detailpage';
import Shoppingcart from './components/shoppingCart';
import Search from './components/search';
import './App.css';



function App() {
  //const [shoppingCart, updateShoppingCart] = useState([]); use till att visa carten i nav

  const [searchVal, updateSearchVal] = useState('');
  const [stock, updateStock] = useState(false);

  return (
    <Router>
      <div>
        <header className='header'>
        <nav className='nav'>
          <Link className='nav-link' id='home'  to='/'>
            Home
          </Link>          
          <Search className='search' updateSearchVal={updateSearchVal} searchVal={searchVal} updateStock={updateStock}/>
          <Link className='nav-link' id='shoppingcart' to='/Shoppingcart'>
            Shoppingcart
          </Link>
        </nav>
        </header>

        <Route exact path='/' 
        render={()=> <Mainpage searchVal={searchVal} stock={stock}/>}
          
        />
        <Route
          path='/Detailpage/:id'
          render={props => <Detailpage {...props} />}
        />
        <Route
          path='/Shoppingcart'
          render={props => <Shoppingcart {...props}/>}
        />
      </div>
    </Router>
  );
}

export default App;
