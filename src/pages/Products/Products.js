import React, { useEffect, useState } from 'react';
import { addMonths } from 'date-fns';

const Products = ({
  loading,
  products,
  loadProducts,
  addToCart,
  loadCart,
  cart,
  updateQuantity,
}) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    loadProducts();
    loadCart();
  }, [loadProducts, loadCart]);

  const loadCurrentDate = () => {
    import('date-fns').then(({ format }) => {
      setCurrentDate(format(new Date(), 'dd MM yy'));
    });
  };

  const loadCurrentDate1 = () => {
    import('date-fns').then(({ format }) => {
      setCurrentDate(format(new Date(), 'dd MM yyyy'));
    });
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      <h1>Cart Details</h1>
      <h2>{currentDate}</h2>
      <button type="button" onClick={loadCurrentDate}>
        Get Current Date
      </button>
      <button type="button" onClick={loadCurrentDate1}>
        Get Current Date
      </button>
      {products.map(product => (
        <div key={product.id} style={{ margin: 10 }}>
          <div>{`Product Name: ${product.name}`}</div>
          <div>{`Price: ${product.price} ${product.currency}`}</div>
          <div>{`Manufacturer: ${product.ManufacturerName}`}</div>
          <div>{`product Type: ${product.productTypeName}`}</div>
          <div>{`Quantity: ${product.quantities}`}</div>
          {product?.cart ? (
            <div>
              <button
                type="button"
                onClick={() =>
                  updateQuantity({
                    ...product?.cart,
                    quantity: product?.cart.quantity + 1,
                  })
                }
              >
                +
              </button>
              <span style={{ padding: 10 }}>{product.cart.quantity}</span>
              <button
                type="button"
                onClick={() => {
                  updateQuantity({
                    ...product?.cart,
                    quantity: product?.cart.quantity - 1,
                  });
                }}
              >
                -
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                addToCart({
                  ...product,
                  quantity: 1,
                })
              }
            >
              Add To Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
