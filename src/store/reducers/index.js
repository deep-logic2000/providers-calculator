import { combineReducers } from 'redux';

import priceReducer from './priceReducer';

const reducer = combineReducers({
    price: priceReducer,
});

export default reducer;
