import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import { items$, updateItem, addToCart } from '../src/components/store';
import Mainpage from './components/mainpage';
import Detailpage from './components/detailpage';
import Shoppingcart from './components/shoppingCart';
import './App.css';

function App() {
  //const [shoppingCart, updateShoppingCart] = useState([]); use till att visa carten i nav

  return (
    <Router>
      <div>
        <nav className='nav'>
          <Link className='' to='/'>
            Home
          </Link>
          <Link className='' to='/Shoppingcart'>
            Shoppingcart
          </Link>
        </nav>
        <Route exact path='/' component={Mainpage} />
        <Route
          path='/Detailpage/:id'
          render={props => <Detailpage {...props} />}
        />
        <Route
          path='/Shoppingcart'
          render={props => <Shoppingcart {...props} />}
        />
      </div>
    </Router>
  );
}

export default App;
