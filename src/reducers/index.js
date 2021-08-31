import { combineReducers } from 'redux';
import user from './user';
import getCoinsReducer from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const reducer = combineReducers({ user, getCoinsReducer });

export default reducer;
