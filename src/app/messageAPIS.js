import axios from "axios";
import {
  getMessagesFailed,
  getMessagesRequest,
  getMessagesSuccess,
  sendMessageFailed,
  sendMessageRequest,
  sendMessageSuccess,
} from "./actions";
const API_BASE = process.env.REACT_APP_API_BASE;

export const getMessages = (chatId) => async (dispatch) => {
  dispatch(getMessagesRequest());
  try {
    const { data } = await axios.get(
      API_BASE + `/api/message?chatId=${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        },
      }
    );
    dispatch(getMessagesSuccess(data, chatId));
  } catch (err) {
    console.error(err);
    if (err.response.data.message) {
      dispatch(getMessagesFailed(err.response.data.message));
    } else {
      dispatch(getMessagesFailed(err));
    }
  }
};

export const sendMessage = (chatId, text) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const { data } = await axios.post(
      API_BASE + `/api/message`,
      {
        chatId,
        text
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        },
      }
    );
    dispatch(sendMessageSuccess(data));
  } catch (err) {
    console.error(err);
    if (err.response.data.message) {
      dispatch(sendMessageFailed(err.response.data.message));
    } else {
      dispatch(sendMessageFailed(err));
    }
  }
};
