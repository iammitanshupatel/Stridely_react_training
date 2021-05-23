import { all, fork } from 'redux-saga/effects';
import product from './productSaga';
import cart from './cartSaga';

export default function* rootSaga() {
  yield all([fork(product), fork(cart)]);
}
