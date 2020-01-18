const { EventEmitter } = require('events');
const Logger = require('./Logger');
const data = require('./data');

class UsersRepository extends EventEmitter {

  set newUser(user) {
    Logger.userEvent('setUsers');

    this._users.push(user);
  }

  get users() {
    Logger.userEvent('getUsers');

    return this._users;
  }

  constructor() {
    super();
    this._users = data;
  }

  getUser(id) {
    Logger.userEvent('getUser');

    return this._users[id];
  }

}

const usersRepo = (new UsersRepository())
  .on('error', msg => Logger.log(msg))
  .on('log', msg => Logger.log(msg));

module.exports = usersRepo;
