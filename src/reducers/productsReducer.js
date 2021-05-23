const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOAD_PRODUCTS_SUCCESS':
      return payload;

    case 'ADD_PRODUCTS_SUCCESS':
      return [...state, payload];

    case 'UPDATE_PRODUCTS_SUCCESS': {
      const index = state.findIndex(x => x.id === payload.id);
      return [...state.slice(0, index), payload, ...state.slice(index + 1)];
    }

    case 'ADD_CART_TO_PRODUCT': {
      const index = state.findIndex(x => x.id === payload.id);
      return [
        ...state.slice(0, index),
        { ...state[index], cart: payload.quantity === 0 ? null : payload },
        ...state.slice(index + 1),
      ];
    }

    case 'DELETE_PRODUCTS_SUCCESS': {
      const index = state.findIndex(x => x.id === payload.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }

    default:
      return state;
  }
};
