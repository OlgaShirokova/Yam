'use strict';

import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore , autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import { AppRegistry, AsyncStorage } from 'react-native';

import AppContainer from './app/containers/AppContainer/';
import reducers from './app/store/reducers/';
import user from './app/store/reducers/user'
import middlewares from './app/store/middlewares'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(thunk, middlewares))
const store = createStore(
  reducers,
  compose (middleware, autoRehydrate())
)

// Clear storage when starting the app
AsyncStorage.clear();

const persist = persistStore(store, { storage: AsyncStorage })
const App = () => (
  <Provider store={store}>
    <AppContainer persist = {persist} />
  </Provider>
)
export default App;

AppRegistry.registerComponent('Recipe', () => App);
