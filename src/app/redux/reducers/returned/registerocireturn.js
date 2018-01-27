const registerocireturn = (state = [], action) => {
  switch (action.type) {
    case 'REGISTEROCI_RETURN':
      console.log('in registerocireturn reducer');
      console.log('value of data: ', action.data);
      return state = action.data;
    default:
      return state;
  }
}

export default registerocireturn
