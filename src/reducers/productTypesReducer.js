const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOAD_PRODUCT_TYPES_SUCCESS':
      return payload;

    default:
      return state;
  }
};
