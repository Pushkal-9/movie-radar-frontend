import axios from 'axios'
import { config } from '../common/Constants'
import { parseJwt } from './Helpers'

export const movieApi = {
  authenticate,
  signup
}

function authenticate(username, password) {
  return instance.post('/auth/authenticate', { username, password }, {
    headers: { 'Content-type': 'application/json' }
  })
}

function signup(user) {
  return instance.post('/auth/signup', user, {
    headers: { 'Content-type': 'application/json' }
  })
}


const instance = axios.create({
  baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = "/login"
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})