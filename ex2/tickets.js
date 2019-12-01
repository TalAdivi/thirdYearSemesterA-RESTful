const Moment = require('moment')
let ID_COUNT = 1

class ReservationForGaga {
  constructor (name, tiketsAmout) {
    this.name = name
    this.date = new Moment().format('MMMM Do YYYY, h:mm:ss a')
    this.ticketsAmount = tiketsAmout
    this.id = ID_COUNT++
  }

  getID () {
    return this.id
  }

  getName () {
    return this.name
  }

  getAmount () {
    return this.ticketsAmount
  }

  setName (name) {
    this.name = name
  }

  setTicketsAmount (ticketAmount) {
    this.ticketsAmount = ticketAmount
  }
}

module.exports = (name, tiketsAmount) => {
  const eventTicket = new ReservationForGaga(name, tiketsAmount)
  return eventTicket
}
