import { combineReducers, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';

//Ducks
import snackbarReducer from "./ducks/snackbar";
import userSessionReducer from "./ducks/userSession";
// const store = createStore(rootReducer , {});

const rootReducer = combineReducers({
  snackbar: snackbarReducer,
  userSession: userSessionReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

export default store;
export {persistor};