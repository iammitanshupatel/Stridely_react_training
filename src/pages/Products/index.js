import { memo } from 'react';

import { connect } from 'react-redux';
import Products from './Products';

const mapStateToProps = ({ products, cart, loading, error }) => ({
  products,
  cart,
  loading: loading['LOAD_PRODUCTS'] || loading['LOAD_CART'] || loading['ADD_TO_CART'],
  productRequestError: error['LOAD_PRODUCTS'],
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch({ type: 'LOAD_PRODUCTS_REQUEST' }),
  loadCart: () => dispatch({ type: 'LOAD_CART_REQUEST' }),
  addToCart: data => dispatch({ type: 'ADD_TO_CART_REQUEST', payload: data }),
  updateQuantity: data => dispatch({ type: 'UPDATE_QUANTITY_REQUEST', payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Products));
