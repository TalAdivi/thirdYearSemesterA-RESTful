let TOTAL_TICKETS_AMOUNT = 0
const { EventEmitter } = require('events')
const eventsConfig = require('./config').events
const oneTicket = require('./tickets')

class ReservationManager extends EventEmitter {
  constructor () {
    super()
    this.allTikets = new Map()
  }

  reduceTicket (name) {
    if (TOTAL_TICKETS_AMOUNT <= 0) {
      this.emit(eventsConfig.noMoreTicket)
    } else {
      // have thigs to do here
      this.emit(eventsConfig.removeTicket)
    }
  }

  addTicket (name, ticketsAmount) {
    if (TOTAL_TICKETS_AMOUNT < 10) {
      const newTicket = oneTicket(name, ticketsAmount)

      this.allTikets.set(newTicket.id, newTicket)
      console.log(this.allTikets)

      TOTAL_TICKETS_AMOUNT += ticketsAmount
      //   this.emit('ticketIncreased')
      //   console.log(this.allTikets)
      this.emit(eventsConfig.addTicket, name, ticketsAmount, newTicket.id)
      return newTicket.getID()
    } else {
    //   this.emit('noMoreTickets')
      this.emit(eventsConfig.noMoreTicket)
    }
  }

  getTicketsAmount () {
    return TOTAL_TICKETS_AMOUNT
  }

  getAllTickets () {
    console.log('inside getAllTickets')
    let allUsersString = ''
    for (const iterator in this.allTikets) {
      console.log(iterator)
      allUsersString += JSON.stringify(this.allTikets[iterator]) + '\n'
    }
    return allUsersString
  }
}

module.exports = () => {
  const eventTicket = new ReservationManager()
  return eventTicket
}
