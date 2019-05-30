
import axios from 'axios';

window.axios = axios 

const headers = {
  'Accept': "application/json",
  "Content-Type": "application/json"
}

async function get(url, data) {

  try {
    const response = await axios.get(url, {
      headers,
      params: data,
    })
    return handleResponse(url, response)
  } catch(error) {
    console.log(error, `url ${url}`)
      return Promise.reject(`response status: ${url}`)
  }
}

async function post(url, data) {
  try {
    const response = await axios.post(url, data, {
      headers,
    });
    debugger;
    return handleResponse(url, response);
  }
  catch (error) {
    console.log(error, `url ${url}`);
    return Promise.reject(`response status: ${url}`)
  }
}

function handleResponse(url, response) {

  if (response.status === 200) {
    return response.data
  } else {
    return Promise.reject(`response status: ${response.status}, ${url}`)
  }
  // try {
  //   const responseJSON = await response.json()
  //   return responseJSON
  // } catch(error) {
  //   return Promise.reject(`response status: ${response.status}, ${url}`)
  // }
}

export { get, post }