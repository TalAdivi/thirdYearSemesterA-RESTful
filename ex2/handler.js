// let logText = ''

// const funky = () => {
//   console.log('obj added-----------')
//   logText += 'new ticket added'
//   console.log(logText)
// }

// // function funky () {
// //   console.log('obj added-----------')
// // //   console.log(ticketObj.getTicketsAmount())
// // }

// // module.exports = {
// //   funky
// // }
// exports.logText = logText
// exports.funky = funky

class Logger {
  constructor () {
    this.logText = 'BLA'
  }

  funky () {
    console.log('obj added-----------')
    console.log(this.logText)
    this.logText += 'new ticket added'
  }

  getLogText () {
    return this.logText
  }
}

module.exports = () => {
  const myLogger = new Logger()
  return myLogger
}
