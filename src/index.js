import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux'
import allReducers from './reducers'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'
import { PERSIST, PURGE } from 'redux-persist/es/constants';

const config = {
    blacklist: [PERSIST, PURGE],
} //redux-state-sync
const persistConfig = {  //redux-persist
    key: 'root',
    storage,
}
const middlewares = [  //redux-state-sync
    createStateSyncMiddleware(config),
]
const persistedReducer = persistReducer(persistConfig, allReducers) //redux-persist
// let store = createStore(persistedReducer) //redux-persist
const store = createStore(persistedReducer, {}, applyMiddleware(...middlewares)) //redux-state-sync

let persistor = persistStore(store)  //redux-persist
// const store = createStore(allReducers) //redux-persist
initStateWithPrevTab(store)  //redux-state-sync

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null}
            persistor={persistor} //redux-persist
        >
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
