import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Provider store={store}>
          <App />
        </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
