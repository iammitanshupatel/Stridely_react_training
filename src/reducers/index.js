import { combineReducers } from 'redux';
import todo from './todoReducer';
import products from './productsReducer';
import manufacturers from './ManufacturersReducer';
import productTypes from './productTypesReducer';
import cart from './cartReducer';
import loading from './loadingReducer';
import error from './errorReducer';

export default combineReducers({
  todo,
  products,
  manufacturers,
  productTypes,
  cart,
  loading,
  error,
});
