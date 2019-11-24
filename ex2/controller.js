const handler = require('./handler')
const logger = handler()
const http = require('http')
// const url = require('url')
const tiketsForGaga = require('./allTickets')
const eventsConfig = require('./config').events
// const users = require('./authentications')
const ticketObj = tiketsForGaga()
const port = 3031
console.log(logger)
// const { parse } = require('querystring')

http.createServer((req, res) => {
  // const urlObj = url.parse(req.url, true, false)

  // console.log(url)
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
        res.write(`log details:
        ${logger.getLogText()}`)
        console.log(logger.getLogText())
        res.end()
      }
      break

    case 'POST':
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
          // console.log(jsonObj.name)

          res.end('ok')
        })
      }
      // ticketObj.addTicket('Tal', 1)

      break
    default:
      res.write('default')
  }
  ticketObj.on(eventsConfig.addTicket, logger.funky)
  // res.end()
}).listen(port, () => `listining on port ${port}..`)
