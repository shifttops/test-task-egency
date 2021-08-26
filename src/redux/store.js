import dataReducer from "./dataReducer";

import { applyMiddleware , combineReducers , compose , createStore } from "redux";
import thunkMiddleWare from 'redux-thunk'


const rootReducer = combineReducers ( {
        data: dataReducer
    }
)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore ( rootReducer , /* preloadedState, */ composeEnhancers (
    applyMiddleware ( thunkMiddleWare ) ))

export default store
window.store = store