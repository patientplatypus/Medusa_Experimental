const loginreturn = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN_RETURN':
      return state = action.data;
    default:
      return state;
  }
}

export default loginreturn
