const Moment = require('moment')
class Loger {
  constructor () {
    this.logText = 'Starting to Log... \n'
  }

  addToLog (event) {
    // console.log('obj added-----------')
    // this.logText += `new ticket added at ${Date.now()}`
    this.logText += `'\n' ${event} at ${new Moment().format('MMMM Do YYYY, h:mm:ss a')} `
  }

  getLogText () {
    return this.logText
  }
}

module.exports = () => {
  const myLogger = new Loger()
  return myLogger
}
