import { toast } from 'react-toastify';

import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;

const CLOUDINARY_CLOUD_NAME=process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY=process.env.REACT_APP_CLOUDINARY_API_KEY

const { registerUserRequest, registerUserSuccess, registerUserFailed, loginUserRequest, loginUserSuccess, loginUserFailed, getUsersRequest, getUsersSuccess, getUsersFailed, saveUserData } =  require('./actions')



export const getUserData = () => async (dispatch) => {
  try {
    const { data } = await axios.get(API_BASE+"/api/user/data", {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
       }
    })
    dispatch(saveUserData(data))
  } catch (error) {
    console.error(error)
  }
}

export const getUsers = username => async (dispatch) => {
  dispatch(getUsersRequest())
  try {
    const { data } = await axios.get(API_BASE+`/api/user${username? "?username="+username : ""}`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
       }
    });
    dispatch(getUsersSuccess(data))
  } catch (err) {
    console.log("err: ", err)
    if (err.response.data.message) {
      toast.warning(err.response.data.message)
      dispatch(getUsersFailed(err.response.data.message));
    } else {
      dispatch(getUsersFailed(err));
    }
    window.location.href = "/login"
  }
}

export const registerUser = (username, handle, password, profilePic) => async (dispatch) => {
  let success = "Signed Up successfully";
  let error = "Error while Signing Up";


  // get signature. In reality you could store this in localstorage or some other cache mechanism, it's good for 1 hour
  const signatureResponse = await axios.get(API_BASE+"/get-cloud-signature")
  console.log(signatureResponse)
  console.log(profilePic)

  const data = new FormData()
  data.append("file", profilePic)
  data.append("api_key", CLOUDINARY_API_KEY)
  data.append("signature", signatureResponse.data.signature)
  data.append("timestamp", signatureResponse.data.timestamp)
  console.log(data)

  const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: function (e) {
      console.log(e.loaded / e.total)
    }
  })
  console.log(cloudinaryResponse.data)

  // send the image info back to our server
  const photoData = {
    public_id: cloudinaryResponse.data.public_id,
    version: cloudinaryResponse.data.version,
    signature: cloudinaryResponse.data.signature
  }


  toast.promise(
    new Promise(async (resolve, reject) => {
      dispatch(registerUserRequest())
      try {
        const { data } = await axios.post(API_BASE+"/api/user/register", {
          username,
          handle,
          password,
          public_id: photoData.public_id,
          signature: photoData.signature,
          version: photoData.version
        });

        dispatch(registerUserSuccess(data));
        localStorage.setItem("jwt", JSON.stringify(data.jwt));

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

export const updateUser = (username, password, profilePic) => async (dispatch) => {
  let success = "Signed Up successfully";
  let error = "Error while Signing Up";


  // get signature. In reality you could store this in localstorage or some other cache mechanism, it's good for 1 hour
  const signatureResponse = await axios.get(API_BASE+"/get-cloud-signature")
  console.log(signatureResponse)
  console.log(profilePic)

  const data = new FormData()
  data.append("file", profilePic)
  data.append("api_key", CLOUDINARY_API_KEY)
  data.append("signature", signatureResponse.data.signature)
  data.append("timestamp", signatureResponse.data.timestamp)
  console.log(data)

  const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: function (e) {
      console.log(e.loaded / e.total)
    }
  })
  console.log(cloudinaryResponse.data)

  // send the image info back to our server
  const photoData = {
    public_id: cloudinaryResponse.data.public_id,
    version: cloudinaryResponse.data.version,
    signature: cloudinaryResponse.data.signature
  }


  toast.promise(
    new Promise(async (resolve, reject) => {
      dispatch(registerUserRequest())
      try {
        const { data } = await axios.post(API_BASE+"/api/user/register", {
          username,
          password,
          public_id: photoData.public_id,
          signature: photoData.signature,
          version: photoData.version
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



export const loginUser = (handle, password) => async dispatch => {
  let success = "Signed In successfully";
  let error = "Error while Signing In";

  toast.promise(
    new Promise(async (resolve, reject) => {
      dispatch(loginUserRequest())
      try {
        const { data } = await axios.post(API_BASE+"/api/user/login", {
          handle,
          password
        });

        dispatch(loginUserSuccess(data));
        localStorage.setItem("jwt", JSON.stringify(data.jwt));
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