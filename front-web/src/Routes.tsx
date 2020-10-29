import React from 'react';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import ProductDatails from './pages/Catalog/components/ProductDatails';
import Home from './pages/Home';

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/products" exact>
        <Catalog />
      </Route>
      <Route path="/products/:productId">
        <ProductDatails />
      </Route>
      <Redirect from="/admin" to="/admin/products" exact />
      <Route path="/admin">        
        <Admin />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;