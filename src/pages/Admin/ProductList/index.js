import { connect } from 'react-redux';
import ProductList from './ProductList';

const mapStateToProps = ({ products }) => ({
  loading: false,
  products,
  error: '',
});

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch({ type: 'LOAD_PRODUCTS_REQUEST' }),
  updateProduct: data => dispatch({ type: 'UPDATE_PRODUCTS_REQUEST', payload: data }),
  deleteProduct: data => dispatch({ type: 'DELETE_PRODUCTS_REQUEST', payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
