export const registerUserRequest = () => ({ type: "REGISTER_USERS_REQUEST" })
export const registerUserSuccess = message => ({ type: "REGISTER_USER_SUCCESS", payload: message })
export const registerUserFailed = error => ({ type: "REGISTER_USER_FAILED", payload: error })
export const loginUserRequest = () => ({ type: "LOGIN_USERS_REQUEST" })
export const loginUserSuccess = message => ({ type: "LOGIN_USER_SUCCESS", payload: message })
export const loginUserFailed = error => ({ type: "LOGIN_USER_FAILED", payload: error })
export const getUsersRequest = () => ({ type: "GET_USERS_REQUEST" })
export const getUsersSuccess = users => ({ type: "GET_USERS_SUCCESS", payload: users })
export const getUsersFailed = error => ({ type: "GET_USERS_FAILED", payload: error })