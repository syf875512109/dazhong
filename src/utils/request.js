
import axios from 'axios';

const headers = new Headers({
  'Accept': "application/json",
  "Content-Type": "application/json"
})

async function get(url, data) {

  try {
    const response = await axios.get(url, {
      headers,
      params: data,
    })
    handleResponse(url, response)
  } catch(error) {
    console.log(error, `url ${url}`)
      return Promise.reject(`response status: ${response.status}, ${url}`)
  }
}

async function post(url, data) {
  try {
    const response = await axios.post(url, data, {
      headers,
    });
    handleResponse(url, response);
  }
  catch (error) {
    console.log(error, `url ${url}`);
    return Promise.reject(`response status: ${response.status}, ${url}`)
  }
}

async function handleResponse(url, response) {

  try {
    const responseJSON = await response.json()
    return responseJSON
  } catch(error) {
    return Promise.reject(`response status: ${response.status}, ${url}`)
  }
}

export { get, post }