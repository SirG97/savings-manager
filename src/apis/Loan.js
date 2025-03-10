import {
  actionStart,
  actionSuccess,
  actionFailed,
} from "../redux-store/ActionSlice";
import axios from "axios";

export const getAvailableLoan = async (dispatch) => {
  dispatch(actionStart());
  try {
    let url;

    url = process.env.REACT_APP_BASE_URL + `/user/loan/read/1`;

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
};

export const applyForLoan = async (dispatch, data) => {
    dispatch(actionStart());
    try {
      const resp = await axios.post(
        process.env.REACT_APP_BASE_URL + `/user/loan_application/create`,
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

  export const getLoanApplicationsByBranchId = async (dispatch, id, status, params) => {
    dispatch(actionStart());
    try {
      let url = process.env.REACT_APP_BASE_URL + `/user/loan_application/branch_read/${id}`;
      if (status !== null) {
        url += `/${status}`;
      }
      const resp = await axios.get(url, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          page: params?.page,
          size: params?.perPage,
        },
      });
      dispatch(actionSuccess());
      return resp;
    } catch (err) {
      dispatch(actionFailed());
      return err;
    }
  };

export const getPendingLoans = async (dispatch, id, params) => {
  dispatch(actionStart());
  try {
    let url = process.env.REACT_APP_BASE_URL + `/user/customer/user_read/${id}`;

    const resp = await axios.get(url, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      params: {
        page: params?.page,
        size: params?.perPage,
      },
    });
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
};

export const getCustomersBranchIdAndUserId = async (
  dispatch,
  branchId,
  userId,
  params,
) => {
  dispatch(actionStart());
  try {
    let url;
    if (userId) {
      url =
        process.env.REACT_APP_BASE_URL + `/user/customer/branch_read/${userId}`;
    } else {
      url = process.env.REACT_APP_BASE_URL + `/user/customer/read`;
    }
    const resp = await axios.get(url, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      params: {
        page: params?.page,
        size: params?.perPage,
      },
    });
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

export const getTransactionByTypeAndBranchId = async (
  dispatch,
  branchId,
  type,
  params,
) => {
  dispatch(actionStart());
  try {
    const resp = await axios.get(
      process.env.REACT_APP_BASE_URL +
        `/user/transaction/branch_read/${type}/${branchId}`,
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

export const approveLoan = async (dispatch, data) => {
  dispatch(actionStart());
  try {
    const resp = await axios.put(
      process.env.REACT_APP_BASE_URL + `/user/loan_application/approve`,
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

export const rejectLoan = async (dispatch, data) => {
  dispatch(actionStart());
  try {
    const resp = await axios.put(
      process.env.REACT_APP_BASE_URL + `/user/loan_application/reject`,
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

export const getLoanApplicationsByCustomerId = async (dispatch, id, status, params) => {
  dispatch(actionStart());
  try {
    let url = process.env.REACT_APP_BASE_URL + `/user/loan_application/customer_read/${id}`;
    if (status !== null) {
      url += `/${status}`;
    }
    const resp = await axios.get(url, {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      params: {
        page: params?.page,
        size: params?.perPage,
      },
    });
    dispatch(actionSuccess());
    return resp;
  } catch (err) {
    dispatch(actionFailed());
    return err;
  }
};
