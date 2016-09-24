import { applyMiddleware, compose, createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules/reducers';

export default function createStore() {
    const middleware = applyMiddleware(thunk);

    const createStoreWithMiddleware = compose(
        middleware,
    );

    const _store = createStoreWithMiddleware(_createStore)(rootReducer);

    return _store;
}