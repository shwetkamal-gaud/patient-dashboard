import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga/rootSaga';
import { mainReducer } from './reducers/reducers';


const rootReducer = combineReducers({
    api: mainReducer,
});


const sagaMiddleware = createSagaMiddleware();


const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);


sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
