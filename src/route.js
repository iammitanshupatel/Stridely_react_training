import { lazy } from 'react';

const Admin = lazy(() => import('pages/Admin'));
const AddProduct = lazy(() => import('pages/Admin/AddProduct'));
const ProductList = lazy(() => import('pages/Admin/ProductList'));
const Cart = lazy(() => import('pages/Cart'));
const Home = lazy(() => import('pages/Home'));
const Products = lazy(() => import('pages/Products'));
const Login = lazy(() => import('pages/Login'));

export default [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/admin',
    component: Admin,
    routes: [
      {
        path: '/admin',
        exact: true,
        component: ProductList,
      },
      {
        path: '/admin/addProduct',
        component: AddProduct,
      },
      {
        path: '/admin/updateProduct/:id',
        component: AddProduct,
      },
    ],
  },
  {
    path: '/products',
    component: Products,
  },
  {
    path: '/cart',
    component: Cart,
  },
];
