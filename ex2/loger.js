const Moment = require('moment')
class Loger {
  constructor () {
    this.logText = ''
  }

  addToLog (event) {
    this.logText += `'\n'${new Moment().format()}:\t  ${event}`
  }

  getLogText () {
    return this.logText
  }
}

module.exports = () => {
  const myLogger = new Loger()

  return myLogger
}
