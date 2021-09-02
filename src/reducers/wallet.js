const ESTADO_INICIAL_WALLET = {
  currencies: [],
  expenses: [],
};

const wallet = (state = ESTADO_INICIAL_WALLET, action) => {
  switch (action.type) {
  case 'GET_COINS_SUCCESS':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'GET_EXPENSES':
    return {
      ...state,
      expenses: action.payload,
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: action.expUpdate,
    };
  default:
    return state;
  }
};

export default wallet;
