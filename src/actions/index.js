import { getCoinsApi } from '../services/awesomeApi';

export const inputEmail = (payload) => ({
  type: 'SAVE_MAIL',
  payload,
});// Coloque aqui suas actions

export const getCoinsApiSuccess = (payload) => ({
  type: 'GET_COINS_SUCCESS',
  payload,
});

export const getCoinsApiThunk = () => async (dispatch) => {
  const response = await getCoinsApi();
  const payload = {
    currencies: response,
  };
  dispatch(getCoinsApiSuccess(payload));
};
