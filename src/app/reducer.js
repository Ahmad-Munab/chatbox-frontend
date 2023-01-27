import initialStates from "./initialStates"

const reducer =  (state = initialStates, action) => {
  switch (action.type) {
    case 'REGISTER_USER_REQUEST':
      return {
        ...state,
        registerUserSuccess: null,
        registeringUser: true,
        error: null
      }
    case 'REGISTER_USER_SUCCESS':
      return {
        ...state,
        registerUserSuccess: action.payload,
        registeringUser: false,
        error: null
      }
    case 'REGISTER_USER_FAILED':
      return {
        registeringUser: false,
        error: action.payload
      }
    case 'LOGIN_USER_REQUEST':
      return {
        ...state,
        loginUserSuccess: null,
        loggingUser: true,
        error: null
      }
    case 'LOGIN_USER_SUCCESS':
      return {
        ...state,
        loginUserSuccess: action.payload,
        loggingUser: false,
        error: null
      }
    case 'LOGIN_USER_FAILED':
      return {
        loggingUser: false,
        error: action.payload
      }
    case 'GET_USERS_REQUEST':
      return {
        ...state,
        loadingUsers: true,
        error: null
      }
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        loadingUsers: false,
        users: action.payload,
        error: null
      }
    case 'GET_USERS_FAILED':
      return {
        ...state,
        loadingUsers: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default reducer