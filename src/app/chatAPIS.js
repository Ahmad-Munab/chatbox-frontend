// import { toast } from 'react-toastify';

import axios from 'axios';
import { getChatsFailed, getChatsRequest, getChatsSuccess } from './actions';
const API_BASE = process.env.REACT_APP_API_BASE;


export const getChats = () => async (dispatch) => {
    dispatch(getChatsRequest())
    try {
      const { data } = await axios.get(API_BASE+`/api/chat`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`
         }
      });
      dispatch(getChatsSuccess(data))
    } catch (err) {
      console.log("err: ", err)
      if (err.response.data.message) {
        // toast.warning(err.response.data.message)
        dispatch(getChatsFailed(err.response.data.message));
      } else {
        dispatch(getChatsFailed(err));
      }
    }
  }