const { getAllTickets, addTicket, getLog, deleteAllReservations, deleteOneReservation, updateTicket } = require('./handler')
const deleteOneRsrvtionPattern = /deleteReservation/g
const updateRsrvtionPattern = /updateReservation/g
module.exports = (req, res) => {
  switch (req.method) {
    case 'GET':
      if (req.url === '/getAllTickets') { getAllTickets(req, res) }

      if (req.url === '/getLog') { getLog(req, res) }
      break

    case 'POST':
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
