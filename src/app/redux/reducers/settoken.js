const settoken = (state = '', action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return state = action.data;
    default:
      return state;
  }
}

export default settoken
