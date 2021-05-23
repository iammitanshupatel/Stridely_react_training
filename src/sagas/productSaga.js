import { initialValues } from 'pages/Admin/AddProduct/fields';
import { takeEvery, takeLatest, call, put, all, select } from 'redux-saga/effects';
import axiosInstance from 'utils/fetcher';
import history from '../history';

const loadData = async () => {
  const res = await Promise.allSettled([
    axiosInstance.get('products'),
    axiosInstance.get('productTypes'),
    axiosInstance.get('manifacturers'),
  ]);
  return res;
};

const getProductTypes = state => state.productTypes;
const getManufacturers = state => state.manufacturers;

const addProductDetails = (product, productTypes, manufacturers) => {
  console.log(product, productTypes, manufacturers);
  return {
    ...product,
    productTypeName: productTypes.find(x => x.id === product.id)?.type || '',
    ManufacturerName: manufacturers.find(x => x.id === product.id)?.manifacturer || '',
  };
};

function* loadProducts() {
  yield put({ type: 'LOAD_PRODUCT_TYPES_REQUEST' });
  yield put({ type: 'LOAD_MANUFACTURER_REQUEST' });
  const [productRes, productTypesRes, manifacturersRes] = yield call(loadData);

  if (productTypesRes.status === 'fulfilled') {
    yield put({ type: 'LOAD_PRODUCT_TYPES_SUCCESS', payload: productTypesRes.value });
  } else {
    yield put({ type: 'LOAD_PRODUCT_TYPES_FAIL', payload: productTypesRes.reason });
  }
  if (manifacturersRes.status === 'fulfilled') {
    yield put({ type: 'LOAD_MANUFACTURER_SUCCESS', payload: manifacturersRes.value });
  } else {
    yield put({ type: 'LOAD_MANUFACTURER_FAIL', payload: manifacturersRes.reason });
  }

  if (productRes.status === 'fulfilled') {
    yield put({
      type: 'LOAD_PRODUCTS_SUCCESS',
      payload: productRes.value.map(product =>
        addProductDetails(product, productTypesRes.value, manifacturersRes.value),
      ),
    });
  } else {
    yield put({ type: 'LOAD_PRODUCTS_FAIL', payload: productRes.reason });
  }
}

function* updateProduct({ payload, actions }) {
  try {
    console.log(actions);
    const product = yield call(axiosInstance.put, `products/${payload.id}`, payload);
    const productTypes = yield select(getProductTypes);
    const manufacturers = yield select(getManufacturers);
    yield put({
      type: 'UPDATE_PRODUCTS_SUCCESS',
      payload: addProductDetails(product, productTypes, manufacturers),
    });
    if (actions) {
      yield call(actions.resetForm, initialValues);
    }
  } catch (error) {
    yield put({ type: 'UPDATE_PRODUCTS_FAIL', payload: error });
  }
}

function* deleteProduct({ payload }) {
  try {
    yield call(axiosInstance.delete, `products/${payload.id}`);
    yield put({ type: 'DELETE_PRODUCTS_SUCCESS', payload });
  } catch (error) {
    yield put({ type: 'DELETE_PRODUCTS_FAIL', payload: error });
  }
}

function* addProducts({ payload, actions }) {
  try {
    const product = yield call(axiosInstance.post, 'products', payload);
    const productTypes = yield select(getProductTypes);
    const manufacturers = yield select(getManufacturers);
    yield put({
      type: 'ADD_PRODUCTS_SUCCESS',
      payload: addProductDetails(product, productTypes, manufacturers),
    });
    yield call(actions.resetForm);
    yield call(history.goBack);
  } catch (error) {
    yield put({ type: 'ADD_PRODUCTS_FAIL', payload: error });
    yield call(actions.setErrors, { serverError: error.message });
  }
}

export default function* root() {
  yield all([
    takeEvery('LOAD_PRODUCTS_REQUEST', loadProducts),
    takeEvery('ADD_PRODUCTS_REQUEST', addProducts),
    takeLatest('UPDATE_PRODUCTS_REQUEST', updateProduct),
    takeLatest('DELETE_PRODUCTS_REQUEST', deleteProduct),
  ]);
}
