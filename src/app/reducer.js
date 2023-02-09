import initialStates from "./initialStates";

const reducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SAVE_USER_DATA":
      return {
        ...state,
        thisUser: {
          username: action.payload.username,
          handle: action.payload.handle,
          profilePic: action.payload.profilePic,
          friends: action.payload.friends,
        },
      };
    case "REGISTER_USER_REQUEST":
      return {
        ...state,
        registerUserSuccess: null,
        registeringUser: true,
        error: null,
      };
    case "REGISTER_USER_SUCCESS":
      return {
        ...state,
        registerUserSuccess: action.payload,
        registeringUser: false,
        error: null,
      };
    case "REGISTER_USER_FAILED":
      return {
        registeringUser: false,
        error: action.payload,
      };
    case "LOGIN_USER_REQUEST":
      return {
        ...state,
        loginUserSuccess: null,
        loggingUser: true,
        error: null,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        loginUserSuccess: action.payload,
        loggingUser: false,
        error: null,
      };
    case "LOGIN_USER_FAILED":
      return {
        loggingUser: false,
        error: action.payload,
      };
    case "GET_USERS_REQUEST":
      return {
        ...state,
        loadingUsers: true,
        error: null,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        loadingUsers: false,
        users: action.payload,
        error: null,
      };
    case "GET_USERS_FAILED":
      return {
        ...state,
        loadingUsers: false,
        error: action.payload,
      };
    case "GET_FRIENDS_REQUEST":
      return {
        ...state,
        loadingFriends: true,
        error: null,
      };
    case "GET_FRIENDS_SUCCESS":
      return {
        ...state,
        loadingFriends: false,
        friends: action.payload,
        error: null,
      };
    case "GET_FRIENDS_FAILED":
      return {
        ...state,
        loadingFriends: false,
        error: action.payload,
      };
    case "ADD_FRIEND_REQUEST":
      return {
        ...state,
        loadingFriends: true,
        error: null,
      };
    case "ADD_FRIEND_SUCCESS":
      return {
        ...state,
        loadingFriends: false,
        friends: [...state.friends, action.payload.friend],
        chats: [...state.chats, action.payload.chat],
        error: null,
      };
    case "ADD_FRIEND_FAILED":
      return {
        ...state,
        loadingFriends: false,
        error: action.payload,
      };
    case "REMOVE_FRIEND_REQUEST":
      return {
        ...state,
        loadingFriends: true,
        error: null,
      };
    case "REMOVE_FRIEND_SUCCESS":
      return {
        ...state,
        loadingFriends: false,
        friends: state.friends.filter(friend => friend._id !== action.payload.deletedFriendId),
        chats: state.chats.filter(chat => chat._id !== action.payload.deletedChatId),
        error: null,
      };
    case "REMOVE_FRIEND_FAILED":
      return {
        ...state,
        loadingFriends: false,
        error: action.payload,
      };
    case "GET_CHATS_REQUEST":
      return {
        ...state,
        loadingChats: true,
        error: null,
      };
    case "GET_CHATS_SUCCESS":
      return {
        ...state,
        loadingChats: false,
        chats: action.payload,
        error: null,
      };
    case "GET_CHATS_FAILED":
      return {
        ...state,
        loadingChats: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
