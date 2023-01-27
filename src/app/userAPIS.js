import { toast } from 'react-toastify';

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

const { registerUserRequest, registerUserSuccess, registerUserFailed, loginUserRequest, loginUserSuccess, loginUserFailed, getUsersRequest, getUsersSuccess, getUsersFailed } =  require('./actions')


export const getUsers = username => async (dispatch) => {
  dispatch(getUsersRequest())
  console.log(username)
  try {
    console.log(username)
    const res = await axios.get(API_BASE + '/api/user', {
      username
    });
    console.log("response: ", res);
    dispatch(getUsersSuccess(res.data))
  } catch (err) {
    console.log("err: ", err)
      if (err.response.data.message) {
        toast.warning(err.response.data.message)
        dispatch(getUsersFailed(err.response.data.message));
      } else {
        dispatch(getUsersFailed(err));
      }
  }
}

export const registerUser = (username, password) => async (dispatch) => {
  let success = "Signed Up successfully";
  let error = "Error while Signing Up";

  toast.promise(
    new Promise(async (resolve, reject) => {
      dispatch(registerUserRequest())
      try {
        const { data } = await axios.post(API_BASE + "/api/user/register", {
          username,
          password
        });

        dispatch(registerUserSuccess(data));
        resolve(data);
      } catch (err) {
        if (err.response.data.message) {
          error = err.response.data.message
          dispatch(registerUserFailed(error))
          toast.error(error)
          reject(error)
        } else {
          dispatch(registerUserFailed(err))
          reject(err)
        }
      }
    }),
    {
      pending: "Signing Up...",
      success,
      error
    }
  );
};



export const loginUser = (username, password) => async dispatch => {
  let success = "Signed In successfully";
  let error = "Error while Signing In";

  toast.promise(
    new Promise(async (resolve, reject) => {
      dispatch(loginUserRequest())
      try {
        const { data } = await axios.post(API_BASE + "/api/user/login", {
          username,
          password
        });

        dispatch(loginUserSuccess(data));
        resolve(data);
      } catch (err) {
        if (err.response.data.message) {
          error = err.response.data.message
          dispatch(loginUserFailed(error))
          toast.error(error)
          reject(error)
        } else {
          dispatch(loginUserFailed(err))
          reject(err)
        }
      }
    }),
    {
      pending: "Signing In...",
      success,
      error
    }
  );
};