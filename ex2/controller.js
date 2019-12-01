// const { addToLog } = require('./handler')
const { addTicketHandler, addToLog, loger, logerAddToLog } = require('./handler')

const tiketsForGaga = require('./allTickets')
const eventsConfig = require('./config').events
// const users = require('./authentications')
const ticketObj = tiketsForGaga()
// const { parse } = require('querystring')

ticketObj.on(eventsConfig.addTicket, (name, ticketsAmount, newTicketID) => {
  loger.addToLog(`${name} got ${ticketsAmount} tickets reservation id is: ${newTicketID}`)
})

module.exports = (req, res) => {
  const header = req.headers.authorization || '' // get the header
  const token = header.split(/\s+/).pop() || '' // and the encoded auth token
  const auth = Buffer.from(token, 'base64').toString()
  const parts = auth.split(/:/) // split on colon
  const username = parts[0]
  // eslint-disable-next-line semi
  const password = parts[1];
  switch (req.method) {
    // show all reservations
    // get log of all printed things

    case 'GET':
      // res.write('into GET')
      if (req.url === '/getAllUsers') {
        res.write(`All Users List: ${ticketObj.getAllTickets()}`)
        res.end()
      }

      if (req.url === '/getLog') {
        res.write(loger.getLogText())

        res.end()
      }
      break

    case 'POST':
      // console.log(req.query)
      // you can just modify this role to be disable yea fuck eslint XD does it even help you ? not so much the built in helpers are better... like its built in in other stuff but not configured everytime... its cool.. not really..

      console.log(`user name is: ${username} password is: ${password}`)
      res.write('into POST ')
      if (req.url === '/addNewReservation') {
        let body = ''
        req.on('data', chunk => {
          body += chunk
        })
        req.on('end', () => {
          const jsonObj = JSON.parse(body)

          const ticketID = ticketObj.addTicket(jsonObj.name, jsonObj.amount)
          res.end(`\nSuccess! \nYour Ticket ID is: ${ticketID}\nkeep it!`)
        })
      }

      break
    default:
      res.write('default')
  }
}

/**
 * in express if you want the body you jsut do
 * req.body
 * thats it. you get a json that way. if ure using app.use(JSON)
 * basically
 * and if you want querystring you do req.query
 * which is better... i honestly dont know why we need to do authentication in headers... its strange and no one does it...
 * well you do it in ssh connections n shit but yeah.. otherwise... idk
 */
