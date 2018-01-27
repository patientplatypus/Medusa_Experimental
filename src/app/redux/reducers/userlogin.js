const userlogin = (state = [], action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return state = action.data;
    case 'USER_ERROR':
      return state = action.data;
    case 'LOGIN_RETURN':
      return state = action.data;
    default:
      return state;
  }
}

export default userlogin
