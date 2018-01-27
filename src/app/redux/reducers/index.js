// import { combineReducers } from 'redux'
// import counter from './counter'
// import text from './text'
// import userlogin from './userlogin'
//
// const reducersCombined = combineReducers({
//   counter,
//   userlogin,
//   text
// })
//
// export default reducersCombined

import  { combineReducers }  from 'redux'
import userlogin from './userlogin'
import loginreturn from './returned/loginreturn'
import registerocireturn from './returned/registerocireturn'
import settoken from './settoken'

export default combineReducers({
  userlogin,
  loginreturn,
  registerocireturn,
  settoken,
})
