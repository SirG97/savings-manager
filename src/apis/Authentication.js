
import { actionStart, actionSuccess, actionFailed } from "../redux-store/ActionSlice"
import axios from "axios"

export const loginUser = async (dispatch, user) => {
  
    dispatch(actionStart())
    try {
      const resp = await axios.post(process.env.REACT_APP_BASE_URL + '/auth/manager/login', user, {
        headers: {
          'accept': 'application/json',
          'Content-type': 'application/json',
        }
      })
      dispatch(actionSuccess())
      return resp

    } catch (err) {
      dispatch(actionFailed())
      return err
    }
  }



  export const getUser = async (dispatch, userId) => {
    dispatch(actionStart())
    try {
      const resp = await axios.get(process.env.REACT_APP_BASE_URL + '/v1/auth/'+userId)
      dispatch(actionSuccess())
      return resp
      
    } catch (err) {
      dispatch(actionFailed())
      return err
    }
  }

  export const getMerchant = async (dispatch, accessToken) => {
    dispatch(actionStart())
    try {
      const resp = await axios.get(process.env.REACT_APP_BASE_URL + '/admin/v1/merchant',{
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
        
      })
      dispatch(actionSuccess())
      return resp
      
    } catch (err) {
      dispatch(actionFailed())
      return err
    }
  }

  export const changePassword = async (dispatch, data) => {
  
    dispatch(actionStart())
    try {
      const resp = await axios.post(process.env.REACT_APP_BASE_URL + '/user/change/password', data, {
        headers: {
          'accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      dispatch(actionSuccess())
      return resp

    } catch (err) {
      dispatch(actionFailed())
      return err
    }
  }


