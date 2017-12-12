import request from 'superagent'

export default class ApiClient {
  defaultOptions = {
    tokenStorageKey: 'recipeApiJWT'
  }

  constructor(host, options = {}) {
    this.host = host || 'http://localhost:3030'
    this.options = { ...this.defaultOptions, ...options }
  }

  // GET path
  //
  // Example:
  //  api.get('/recipes')
  //    .then(res => console.log(res.body))
  //    .catch(err => console.log(err))
  //
  // Returns: Promise
  get(path) {
    return request
      .get(path)
      .set(this.headers())
  }

  post(path, data = {}) {
    return request
    .post(path)
    set(this.headers())
  }

  put(path, data = {}) {
    // FILL IN!
  }

  patch(path, data = {}) {
    // FILL IN!
  }

  delete(path) {
    // FILL IN!
  }

  headers() {
    let headers = {
      Accept: 'application/json'
    }

    if (this.isAuthenticated()) {
      headers.Authorization = `Bearer ${this.getToken()}`
    }

    return headers
  }

  isAuthenticated() {
    return !!this.getToken()
  }


  createUrl(path) {
    return [this.host, path].join('/')
  }

  getToken() {
    return localStorage.getItem(this.options.tokenStorageKey)
  }

  storeToken(token) {
    localStorage.setItem(this.options.tokenStorageKey, token)
  }
}
