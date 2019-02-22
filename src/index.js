import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import store from './configureStore';

ReactDOM.render(
  <Router forceRefresh={true} >
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  ,
document.getElementById('root'));