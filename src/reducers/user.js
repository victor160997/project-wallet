const ESTADO_USER_INICIAL = {
  email: '',
};

const user = (state = ESTADO_USER_INICIAL, action) => {
  switch (action.type) {
  case 'SAVE_MAIL':
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
