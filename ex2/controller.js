// const { addToLog } = require('./handler')
const { addTicketHandler, addToLog, loger } = require('./handler')

const tiketsForGaga = require('./allTickets')
const eventsConfig = require('./config').events
// const users = require('./authentications')
const ticketObj = tiketsForGaga()
// const { parse } = require('querystring')
let count = 1

module.exports = (req, res) => {
  switch (req.method) {
    // show all reservations
    // get log of all printed things

    case 'GET':
      // res.write('into GET')
      if (req.url === '/getAllUsers') {
        res.write(`All Users List: 
        ${ticketObj.getAllTickets()}
        `)
        res.end()
      }

      if (req.url === '/getLog') {
        res.write()

        res.end()
      }
      break

    case 'POST':
      console.log('URL IS ' + req.url)
      res.write('into POST ')
      if (req.url === '/addNewReservation') {
        let body = ''
        req.on('data', chunk => {
          body += chunk
        })
        req.on('end', () => {
          // console.log(body)
          const jsonObj = JSON.parse(body)
          ticketObj.addTicket(jsonObj.name, jsonObj.amount)

          // addToLog(`ticket added - name = ${jsonObj.name} \t ticket amount = ${jsonObj.amount}`)
          // console.log(jsonObj.name)
          res.end(`\nSuccess ${count++}`)
        })
      }

      break
    default:
      res.write('default')
  }
  ticketObj.once(eventsConfig.addTicket, (name, ticketsAmount, newTicketID) => {
    loger.addToLog(name)
    console.log(loger.getLogText())
  })
  // ticketObj.on(eventsConfig.addTicket, (name, ticketsAmount, newTicketID) => {
  //   addTicketHandler(name, ticketsAmount, newTicketID)
  // })

  // ticketObj.on(eventsConfig.addTicket, (name, ticketsAmount, newTicketID) => { res.write(`your reservation id is: ${newTicketID}`); res.end('\nSuccess') })
}
