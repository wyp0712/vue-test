
import Service from 'model/Service'
import { paramsEncode } from 'helper.js'
import { COLLECTION_PATH } from 'const/env'

class UserService extends Service {
  login (username, password) {
    return this.send(this.loginUrl + '/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest' }, // , 'X-Requested-With': 'XMLHttpRequest'
      body: paramsEncode({
        username,
        password
      })
    })
  }

  loggedIn () {
    return this.send(this.loginUrl + '/islogin')
  }

  logout () {
    return this.send(this.loginUrl + '/logout')
  }
}
export default new UserService('user', COLLECTION_PATH)
