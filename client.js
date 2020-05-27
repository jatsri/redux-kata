import React from 'react'
import {hydrate} from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'

const state = window.__STATE__;

delete window.__STATE__;

const store = createStore(rootReducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

hydrate(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
