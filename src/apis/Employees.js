
import { actionStart, actionSuccess, actionFailed } from "../redux-store/ActionSlice"
import axios from "axios"

export const getEmployees = async (dispatch) => {
  dispatch(actionStart())
  let user = JSON.parse(localStorage.getItem('userInfo'))
    try {
      const resp = await axios.get(process.env.REACT_APP_BASE_URL + `/user/users/branch_read/${user.branch_id}/all`, {
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
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

export const getEmployee = async (dispatch, id) => {
  dispatch(actionStart())
  try {
    const resp = await axios.get(process.env.REACT_APP_BASE_URL + `/user/users/read/${id}`, {
      headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
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

export const createEmployee = async (dispatch, data) => {
  
    dispatch(actionStart())
    try {
        const resp = await axios.post(process.env.REACT_APP_BASE_URL + `/user/users/create`, data, {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
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