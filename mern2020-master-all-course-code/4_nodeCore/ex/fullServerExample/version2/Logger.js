const moment = require('moment');

module.exports = class Logger {

  static newRequest(request) {
    const time = moment().format('YY-MM-DD hh:mm');

    console.log(`${time}-> ${request.method}:${request.url}`);
  }

  static userEvent(method = '') {
    const time = moment().format('DD-MM-YY hh:mm');

    console.log(`${time}-> ${method} was called`);
  }

  static log(message = '') {
    const time = moment().format('DD-MM-YY hh:mm');

    console.log(`${time}-> ${message}`);
  }

};
