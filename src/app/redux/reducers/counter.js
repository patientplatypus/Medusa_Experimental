const counter = (state = 0, action) => {
  switch (action.type) {
    case 'COUNTER_ADD':
      return state = state + 1;
    case 'COUNTER_SUBTRACT':
      return state = state - 1;
    default:
      return state
  }
}

export default counter
