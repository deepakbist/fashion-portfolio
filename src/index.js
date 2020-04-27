import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/index';
import { Provider } from 'react-redux';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import UserForm from './components/UserForm';
import PortFolio from './components/Portfolio';
import PortfolioGrid from './components/PorfolioGrid';
import EditUser from './components/EditUser';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
  <Provider store={store} >
    <Router>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/create" exact component={UserForm} />
        <Route path="/portfolio" exact component={PortFolio} />
        <Route path="/edit" exact component={EditUser} />
        <Route path='/portfoliogrid' exact component={PortfolioGrid} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
