/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore } from 'redux';

import App from './components/App';
import gameReducer from './reducers/gameReducer';

import '../css/style.css';

const store = createStore(
	gameReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}><App /></Provider>, app);
