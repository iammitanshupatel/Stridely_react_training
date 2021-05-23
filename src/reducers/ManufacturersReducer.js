const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOAD_MANUFACTURER_SUCCESS':
      return payload;

    default:
      return state;
  }
};
