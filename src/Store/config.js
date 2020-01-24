import thunk from 'redux-thunk';
import { compose, applyMiddleware, createStore } from 'redux';

import Reducer from '../Reducer/index';

const composeEnhancer =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

        }) : compose;

const enhancer = composeEnhancer(
    applyMiddleware(thunk)
);

export default createStore(Reducer, enhancer);