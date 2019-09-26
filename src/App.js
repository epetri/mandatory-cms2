import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Mainpage from './components/mainpage';
import Detailpage from './components/detailpage';
import Shoppingcart from './components/shoppingCart';
import Search from './components/search';
import Confirm from './components/confirmPage';
import './App.css';

function App() {
  const [searchVal, updateSearchVal] = useState('');
  const [stock, updateStock] = useState(false);
  const [page, updatePage] = useState(0);

  return (
    <Router>
      <div className='container'>
        <header className='header'>
          <nav className='nav'>
            <Link className='nav-link' id='home' to='/'>
              Home
            </Link>
            <Search
              className='search'
              updateSearchVal={updateSearchVal}
              searchVal={searchVal}
              updateStock={updateStock}
              page={page}
            />
            <Link className='nav-link' id='shoppingcart' to='/Shoppingcart'>
              Shoppingcart
              <i className='fas fa-shopping-cart'></i>
            </Link>
          </nav>
        </header>

        <Route
          exact
          path='/'
          render={props => (
            <Mainpage
              {...props}
              searchVal={searchVal}
              stock={stock}
              page={page}
              updatePage={updatePage}
            />
          )}
        />
        <Route
          path='/Detailpage/:id'
          render={props => <Detailpage {...props} />}
        />
        <Route
          path='/Shoppingcart'
          render={props => <Shoppingcart {...props} />}
        />
        <Route path='/Confirm' component={Confirm} />
      </div>
    </Router>
  );
}

export default App;
