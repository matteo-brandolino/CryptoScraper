import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import store from './redux-store/index'
import {Provider} from 'react-redux'
import axios from 'axios'
import cookie from 'js-cookie'

let token = cookie.get('token')

//render function //avoid repeating code
const render = () => {
  ReactDOM.render(
    <Provider store = {store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

//if token exists //avoid login flash
if(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  //if you refresh and token still exists redirect to /profile
  axios.post("/auth/me")
    .then(res => {
      store.dispatch({type:"SET_LOGIN", payload:res.data})
      render()
      
    })
} else {
  render()
}

