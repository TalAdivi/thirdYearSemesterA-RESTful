// const { addToLog } = require('./handler')
const { getAllTickets, addTicket, getLog, deleteAllReservations, deleteOneReservation, updateTicket } = require('./handler')
const deleteOneRsrvtionPattern = /deleteReservation/g
const updateRsrvtionPattern = /updateReservation/g
module.exports = (req, res) => {
  console.log(req.url)
  switch (req.method) {
    case 'GET':
      if (req.url === '/getAllUsers') { getAllTickets(req, res) }

      if (req.url === '/getLog') { getLog(req, res) }
      break

    case 'POST':
      res.write('into POST ')
      if (req.url === '/addNewReservation') { addTicket(req, res) }
      break

    case 'DELETE':
      if (req.url === '/deleteAll') { deleteAllReservations(req, res) }

      if (req.url.match(deleteOneRsrvtionPattern)) { deleteOneReservation(req, res) }
      break

    case 'PUT':
      if (req.url.match(updateRsrvtionPattern)) {
        console.log('inside update')
        updateTicket(req, res)
      }
      break
    default:
      res.write('default')
  }
}

/**
  *   const header = req.headers.authorization || '' // get the header
  const token = header.split(/\s+/).pop() || '' // and the encoded auth token
  const auth = Buffer.from(token, 'base64').toString()
  const parts = auth.split(/:/) // split on colon
  const username = parts[0]
  // eslint-disable-next-line semi
  const password = parts[1];
*/
