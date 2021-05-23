import { connect } from 'react-redux';
import AddProduct from './AddProduct';

const mapStateToProps = ({ products, manufacturers, productTypes }) => ({
  products,
  manufacturers,
  productTypes,
});

const mapDispatchToProps = dispatch => ({
  manageProduct: (data, actions) =>
    dispatch({
      type: data.id ? 'UPDATE_PRODUCTS_REQUEST' : 'ADD_PRODUCTS_REQUEST',
      payload: data,
      actions,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
