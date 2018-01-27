// @flow weak

/* eslint-disable no-process-env */
import React, {
  Component
}                               from 'react';
// import PropTypes                from 'prop-types';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route
}                               from 'react-router-dom';
import { Provider }             from 'react-redux';
// import { syncHistoryWithStore } from 'react-router-redux';
// import configureStore           from './redux/store/configureStore';
// import { createBrowserHistory } from 'history';
import thunk                    from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import  reducer                 from './redux/reducers'

import AdminNav from './components/Admin/AdminNav';
import Register from './components/Initial/Register';
import Login from './components/Initial/Login';
import UserNav from './components/User/UserNav';

// let store = createStore(reducer, applyMiddleware(thunk))

// const history       = createBrowserHistory();
// const store         = configureStore();
// const syncedHistory = syncHistoryWithStore(history, store);

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router>
              <div>
                <Route exact path="/" exact render={()=><Login />}/>
                <Route path="/Register" exact render={()=><Register />}/>
                <Route path="/Login" exact render={()=><Login />}/>
                <Route path="/AdminNav" exact render={()=><Splash />}/>
                <Route path="/UserNav" exact render={()=><Splash />}/>
              </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default Root;
