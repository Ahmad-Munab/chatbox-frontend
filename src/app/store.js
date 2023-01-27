import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const logger = require('redux-logger').default
const thunk = require('redux-thunk').default

const reducer = require('./reducer')
const initialStates = require('./initialStates')

const store = configureStore({
  reducer,
  preloadedState: initialStates,
  middleware: [...getDefaultMiddleware(), logger, thunk]
});

export default store