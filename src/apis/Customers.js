import {
  actionStart,
  actionSuccess,
  actionFailed,
} from "../redux-store/ActionSlice";
import axios from "axios";

export const getCustomers = async (dispatch, id = undefined, params) => {
  
  dispatch(actionStart());
  try {
    let url;
    if (id) {
      url = process.env.REACT_APP_BASE_URL + `/user/customer/branch_read/${id}`;
    } else {
      url = process.env.REACT_APP_BASE_URL + `/user/customer/read`;
    }
    const resp = await axios.get(url,
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          page: params?.page,
          size: params?.perPage,
        },
      },
    );
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
};

export const getTransactionByType = async (dispatch, type, params) => {
  
  dispatch(actionStart());
  try {
    const resp = await axios.get(
      process.env.REACT_APP_BASE_URL + `/user/transaction/type_read/${type}`,
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          page: params?.page,
          size: params?.perPage,
        },
      },
    );
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
};

export const getTransactionByTypeAndBranchId = async (dispatch,branchId, type, params) => {
  
  dispatch(actionStart());
  try {
    const resp = await axios.get(
      process.env.REACT_APP_BASE_URL + `/user/transaction/branch_read/${type}/${branchId}`,
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          page: params?.page,
          size: params?.perPage,
        },
      },
    );
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
};

export const getTransactionByTypeAndCustomerId = async (
  dispatch,
  customerId,
  type,
  params,
) => {
  dispatch(actionStart());
  try {
    const resp = await axios.get(
      process.env.REACT_APP_BASE_URL +
        `/user/customer_transaction/customer_read/${type}/${customerId}`,
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          page: params?.page,
          size: params?.perPage,
          startDate: params?.value?.startDate,
          endDate: params?.value?.endDate,
        },
      },
    );
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
};

export const createCustomer = async (dispatch, data) => {
  dispatch(actionStart());
  try {
    const resp = await axios.post(
      process.env.REACT_APP_BASE_URL + `/user/customer/create`,
      data,
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    );
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
};

export const getCustomer = async (dispatch, id) => {
  
  dispatch(actionStart());
  try {
    const resp = await axios.get(
      process.env.REACT_APP_BASE_URL + `/user/customer/read/${id}`,
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    );
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
};

export const updateCustomer = async (dispatch, data) => {
  dispatch(actionStart());
  try {
    const resp = await axios.put(
      process.env.REACT_APP_BASE_URL + `/user/customer/update`,
      data,
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    );
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
};

export const createTransaction = async (dispatch, data) => {
  dispatch(actionStart());
  try {
    const resp = await axios.post(
      process.env.REACT_APP_BASE_URL + `/user/customer_transaction/create`,
      data,
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    );
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
};


export const searchCustomers = async (dispatch, query) => {
  dispatch(actionStart());
  try {
    let url;

    url = process.env.REACT_APP_BASE_URL + `/user/search/customer/${query}`;

    const resp = await axios.get(url, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
}