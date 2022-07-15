import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
let _Users = Users;
console.log(LoginUsers, 'LoginUsers')
export default {
  init () {
    let mock = new MockAdapter(axios);
        // mock success request
        mock.onGet('/success').reply(200, {
          msg: 'success'
        });

        // mock error request
        mock.onGet('/error').reply(500, {
          msg: 'failure'
        });
        //获取用户列表（分页）
        mock.onGet('/user/listpage').reply(config => {
          let {page, name} = config.params;
          let mockUsers = _Users.filter(user => {
            if (name && user.name.indexOf(name) == -1) return false;
            return true;
          });
          let total = mockUsers.length;
          mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve([200, {
                total: total,
                users: mockUsers
              }]);
            }, 1000);
          });
        });
  }
}