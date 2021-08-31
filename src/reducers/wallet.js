const ESTADO_INICIAL_WALLET = {
  currencies: [],
  expenses: [],
};

const getCoinsReducer = (state = ESTADO_INICIAL_WALLET, action) => {
  switch (action.type) {
  case 'GET_COINS_SUCCESS':
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default getCoinsReducer;
