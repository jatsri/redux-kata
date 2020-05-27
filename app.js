import express from 'express';
import React from 'react'
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import path from 'path';

import rootReducer from './reducers'
import App from './components/App'

const initialState = {
    visibilityFilter: 'SHOW_ALL',
    todos: []
};
const store = createStore(rootReducer, initialState);
let content = renderToString(
    <Provider store={store} >
        <App />
    </Provider>
);
const scripts = ` <script>
                   window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="/assets/client.js"></script>
                `;

const template = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <title> react-app </title>
              </head>
              <body>
                <div class="content">
                   <div id="app" class="wrap-inner">
                      ${content}
                   </div>
                </div>
                 ${scripts}
              </body>`;

const app = express();

app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

app.listen(process.env.PORT || 3000);

app.get('/', (req, res) => {
    // const { preloadedState, content}  = ssr(initialState);
    // const response = template("Server Rendered Page", preloadedState, content);
    res.setHeader('Cache-Control', 'assets, max-age=604800');
    res.send(template);
});
