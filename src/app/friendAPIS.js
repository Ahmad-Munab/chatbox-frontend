import { toast } from "react-toastify";

import axios from "axios";
const {
  getFriendsFailed,
  getFriendsRequest,
  getFriendsSuccess,
  addFriendRequest,
  addFriendSuccess,
  addFriendFailed,
  removeFriendSuccess,
  removeFriendFailed,
  removeFriendRequest,
} = require("./actions");
const API_BASE = process.env.REACT_APP_API_BASE;

export const getFriends = () => async (dispatch) => {
  dispatch(getFriendsRequest());
  try {
    const { data } = await axios.get(API_BASE + "/api/user/friends", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
      },
    });
    dispatch(getFriendsSuccess(data));
  } catch (err) {
    console.log("err: ", err);
    if (err.response.data.message) {
      toast.warning(err.response.data.message);
      dispatch(getFriendsFailed(err.response.data.message));
    } else {
      dispatch(getFriendsFailed(err));
    }
  }
};

export const addFriend = (_id) => async (dispatch) => {
  dispatch(addFriendRequest());
  try {
    const { data } = await axios.put(
      API_BASE + "/api/user/friends",
      {
        friendId: _id,
      },{
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        },
      }
    );
    toast.success("Friend added!");
    dispatch(addFriendSuccess(data.newFriend, data.newChat));
  } catch (err) {
    console.log("err: ", err);
    if (err.response.data.message) {
      toast.warning(err.response.data.message);
      dispatch(addFriendFailed(err.response.data.message));
    } else {
      dispatch(addFriendFailed(err));
    }
  }
};

export const removeFriend = (_id) => async (dispatch) => {
  dispatch(removeFriendRequest());
  try {
    const { data } = await axios.delete(
      API_BASE + "/api/user/friends",
      {
        friendId: _id,
      },{
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        },
      }
    );
    toast.success("Friend removed!");
    dispatch(removeFriendSuccess(data.deletedFriendId, data.deletedChatId));
  } catch (err) {
    console.log("err: ", err);
    if (err.response.data.message) {
      toast.warning(err.response.data.message);
      dispatch(removeFriendFailed(err.response.data.message));
    } else {
      dispatch(removeFriendFailed(err));
    }
  }
};
