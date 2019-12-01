const loger = require('./loger')()
const ticketObj = require('./allTickets')()
const queryString = require('querystring')

const addTicket = (req, res) => {
  let body = ''
  req.on('data', chunk => { body += chunk })
  req.on('end', () => {
    const bodyJson = JSON.parse(body)
    const ticketID = ticketObj.addTicket(bodyJson.name, bodyJson.amount, loger)

    res.end(`\nSuccess! \nYour Ticket ID is: ${ticketID}\nkeep it!`)
  })
}

const getAllTickets = (req, res) => {
  res.write(`All Users List: ${ticketObj.getAllTickets(loger)}`)
  res.end()
}

const getLog = (req, res) => {
  res.write(`Log -------------------\n${loger.logText}`)
  res.end('Success')
}

const deleteAllReservations = (req, res) => {
  res.write('')
  ticketObj.deleteAllReservations(loger)
  res.end('All reservations has been deleted successfuly')
}

const deleteOneReservation = (req, res) => {
  res.write('')
  const queryObj = queryString.parse(req.url, '?')
  ticketObj.deleteOneReservation(queryObj.id, loger)
  res.end(`Reservation ${queryObj.id} deleted successfuly`)
}

const updateTicket = (req, res) => {
  console.log('updateTicket func')
  const queryObj = queryString.parse(req.url, '?')
  let body = ''
  req.on('data', chunk => { body += chunk })
  req.on('end', () => {
    const bodyJson = JSON.parse(body)
    console.log(bodyJson)
    ticketObj.updateTicket(queryObj.id, bodyJson.name, bodyJson.amount, loger)
    res.end(`Reservation number ${queryObj.id} updated successfuly`)
  })
}

module.exports = {
  addTicket,
  getAllTickets,
  getLog,
  deleteAllReservations,
  deleteOneReservation,
  updateTicket
}
