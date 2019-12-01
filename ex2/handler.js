const loger = require('./loger')()
const addToLog = loger.addToLog
const logerAddToLog = loger.addToLog
const addTicketHandler = (name, amout, id) => {
  console.log(`name: ${name} amount: ${amout} ID: ${id}`)
}
module.exports = {
  loger,
  addToLog,
  addTicketHandler,
  logerAddToLog
}
