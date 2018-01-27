import axios from 'axios';

var token = require('basic-auth-token');

const url = 'http://129.146.85.80:8000/';

//WHY ARE WE DOING THIS???

//if you store the authorization key in localStorage of the browser it allows outside sites to see the authorization for the site.
//for non-production sites this does not matter
//HOWEVER
//if we allow malicious actors access to servers they can use runtime to spin up blockchain mining or other monetarily risky enterprises.
//THIS IS BAD
//So instead we should store the authorization either locally or send to reducers and access there.

//HERE ARE THE AXIOS CALLS

export const checkLoginOCI = (payload) => {
  return (dispatch) => {
    var login = url + "ocilogin";
    var authorizationLocal = "Basic " + token(payload.username, payload.password)

    var auth = {
      headers: {
        "Authorization": authorizationLocal
      }
    }

    console.log('value of login: ', login);
    console.log('value of auth: ', auth);

    dispatch(setTokenAuth({auth: authorizationLocal}))
      axios.get(login, auth)
        .then(response => {
          console.log('inside response from login auth and response : ', response);
          dispatch(loginType("0"))
          dispatch(loginRETURN({0:response.data, 1:'O'}))
        })
        .catch(error => {
          console.log('inside error from login auth and response : ', error);
          dispatch(checkLogin(payload))
          dispatch(loginRETURN(false))
        })

  }
}

export const checkLogin = (payload) => {
  return (dispatch) => {
    var login = url + "login";
    var authorizationLocal = "Basic " + token(payload.username, payload.password)

    var auth = {
      headers: {
        "Authorization": authorizationLocal
      }
    }

    console.log('value of login: ', login);
    console.log('value of auth: ', auth);

    dispatch(setTokenAuth({auth: authorizationLocal}))
      axios.get(login, auth)
        .then(response => {
          console.log('inside response from login auth and response : ', response);
          dispatch(loginRETURN({0:response.data, 1:'R'}))
        })
        .catch(error => {
          console.log('inside error from login auth and response : ', error);
          dispatch(loginType("R"))
          dispatch(loginRETURN(false))
        })

  }
}


export const registerOCI = (formData) => {
  console.log('inside registerOCI and value of formData is : ', formData);
  return dispatch => {
    var link = url + "admin"
    axios.post(link, formData,
    {headers: {
      'Content-Type': 'multipart/form-data'
    }})
    .then(response => {
      console.log(response.data);
      dispatch(registerOCIRETURN(response.data))
    })
    .catch(error => {
      console.log(error);
      dispatch(registerOCIRETURN(false))
    })

  }
}

//HERE ARE THE ACTIONS ->>> REDUCERS

export const setTokenAuth = (payload) => {
  console.log('inside setTokenAuth and value of token is: ', payload.auth);
  return{
    type: 'SET_TOKEN',
    data: payload.auth
  }
}

export const loginType = (type) => {
  console.log('inside loginType: ', type);
  return{
    type: 'USER_LOGIN',
    data: type
  }
}

export const loginError = (error) => {
  console.log('inside loginError: ', error);
  return{
    type: 'USER_ERROR',
    data: error
  }
}

//HERE ARE THE REDUCERS THAT ARE SPECIFICALLY RETURNED TO A COMPONENT

export const loginRETURN = (payload) => {
  console.log('in loginRETURN');
  return{
    type: 'LOGIN_RETURN',
    data: payload
  }
}

export const registerOCIRETURN = (payload) => {
  console.log('in registerOCIRETURN');
  return{
    type: 'REGISTEROCI_RETURN',
    data: payload
  }
}
