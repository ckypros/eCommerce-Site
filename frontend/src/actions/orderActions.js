import * as OrderConstants from '../constants/orderConstants';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OrderConstants.ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: OrderConstants.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderConstants.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OrderConstants.ORDER_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: OrderConstants.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OrderConstants.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
