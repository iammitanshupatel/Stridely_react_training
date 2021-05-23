import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import axiosInstance from 'utils/fetcher';

const getProducts = state => state.products;

function* addToCart({ payload }) {
  try {
    const cart = yield call(axiosInstance.post, 'cart', payload);
    yield put({ type: 'ADD_TO_CART_SUCCESS', payload: cart });
    yield put({ type: 'ADD_CART_TO_PRODUCT', payload: cart });
  } catch (error) {
    yield put({ type: 'ADD_TO_CART_FAIL', payload: error });
  }
}

function* loadCart() {
  try {
    const cart = yield call(axiosInstance.get, 'cart');
    yield put({ type: 'LOAD_CART_SUCCESS', payload: cart });
  } catch (error) {
    yield put({ type: 'LOAD_CART_FAIL', payload: error });
  }
}

function* updateQuantity({ payload }) {
  try {
    const products = yield select(getProducts);
    const product = products.find(x => x.id === payload.id);
    if (product.quantities >= payload.quantity && payload.quantity > 0) {
      const cart = yield call(axiosInstance.put, `cart/${payload.id}`, payload);
      yield put({ type: 'UPDATE_QUANTITY_SUCCESS', payload: cart });
      yield put({ type: 'ADD_CART_TO_PRODUCT', payload: cart });
    } else if (payload.quantity === 0) {
      yield call(axiosInstance.delete, `cart/${payload.id}`);
      yield put({ type: 'REMOVE_FROM_CART_SUCCESS', payload });
      yield put({ type: 'ADD_CART_TO_PRODUCT', payload });
    } else {
      throw new Error('enter valid quantity');
    }
  } catch (error) {
    yield put({ type: 'UPDATE_QUANTITY_FAIL', payload: error });
  }
}

export default function* rootCart() {
  yield all([
    takeEvery('LOAD_CART_REQUEST', loadCart),
    takeLatest('ADD_TO_CART_REQUEST', addToCart),
    takeLatest('UPDATE_QUANTITY_REQUEST', updateQuantity),
  ]);
}
