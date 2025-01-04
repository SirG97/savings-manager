
import { actionStart, actionSuccess, actionFailed } from "../redux-store/ActionSlice"
import axios from "axios"

export const getBranches = async (dispatch) => {
    dispatch(actionStart())
    try {
      const resp = await axios.get(process.env.REACT_APP_BASE_URL + '/user/branch/read/all', {
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
export const getBranch = async (dispatch, id) => {
  dispatch(actionStart())
  try {
    const resp = await axios.get(process.env.REACT_APP_BASE_URL + `/user/branch/read/${id}`, {
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

export const createBranch = async (dispatch, data) => {
  
    dispatch(actionStart())
    try {
        const resp = await axios.post(process.env.REACT_APP_BASE_URL + `/user/branch/create`, data, {
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