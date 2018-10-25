/**
 * store 生成
 */
import thunkMiddleware from 'redux-thunk'
import reduxPromise from 'redux-promise'
// import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import rootReducer from './reducer/index'

// const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      reduxPromise,
      // loggerMiddleware
    )
  )
}