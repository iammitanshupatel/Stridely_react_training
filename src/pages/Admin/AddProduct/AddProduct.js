/* eslint-disable react/forbid-prop-types */
import Form from 'components/form';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fields, initialValues } from './fields';

const AddProduct = ({ history, match, products, manufacturers, productTypes, manageProduct }) => {
  console.log('error');
  const [updatedFields, setUpdatedFields] = useState(fields);
  const [defaultValue, setDefaultValue] = useState(initialValues);

  useEffect(() => {
    setUpdatedFields(
      fields.map(field => {
        if (field.name === 'manifacturerId') {
          return {
            ...field,
            options: manufacturers.map(x => ({ value: x.id, text: x.manifacturer })),
          };
        }
        if (field.name === 'typeId') {
          return {
            ...field,
            options: productTypes.map(x => ({ value: x.id, text: x.type })),
          };
        }
        return field;
      }),
    );
    if (match?.params?.id) {
      setDefaultValue(products.find(x => x.id === Number(match?.params?.id)));
    }
  }, []);

  return (
    <div>
      <h1>Add Product</h1>

      <Form
        fields={updatedFields}
        enableReinitialize={!!match?.params?.id}
        initialValues={defaultValue}
        onSubmit={manageProduct}
        buttonProps={{
          children: 'Add Product',
        }}
      />
    </div>
  );
};

AddProduct.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.any.isRequired,
  products: PropTypes.array.isRequired,
  manufacturers: PropTypes.array.isRequired,
  productTypes: PropTypes.array.isRequired,
  manageProduct: PropTypes.func.isRequired,
};

export default AddProduct;
