// const loger = require('./loger')()
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
    if (TOTAL_TICKETS_AMOUNT <= 0) { this.emit(eventsConfig.noMoreTicket) } else { this.emit(eventsConfig.removeTicket) }
  }

  addTicket (name, ticketsAmount, loger) {
    if (TOTAL_TICKETS_AMOUNT < 10) {
      const newTicket = oneTicket(name, ticketsAmount)
      this.allTikets.set(newTicket.id, newTicket)

      TOTAL_TICKETS_AMOUNT += ticketsAmount
      this.emit(eventsConfig.addTicket, name, ticketsAmount, newTicket.id, loger)
      return newTicket.getID()
    } else { this.emit(eventsConfig.noMoreTicket) }
  }

  getTicketsAmount () { return TOTAL_TICKETS_AMOUNT }

  getAllTickets (loger) {
    let allUsersString = ''
    this.allTikets.forEach((value, key) => { allUsersString += `\nID: ${key}\nObjet: ${JSON.stringify(value)}` })

    this.emit(eventsConfig.getAllTickets, loger)
    return allUsersString
  }

  deleteAllReservations (loger) {
    this.allTikets.clear()

    this.emit(eventsConfig.deleteAll, loger)
  }

  deleteOneReservation (rsrvtionID, loger) {
    const id = parseInt(rsrvtionID)
    this.allTikets.delete(id)

    this.emit(eventsConfig.deleteOneReservation, loger, rsrvtionID)
  }

  updateTicket (rsrvtionID, name, ticketsAmount, loger) {
    const id = parseInt(rsrvtionID)
    const resrvationToUpdate = this.allTikets.get(id)
    const prevRsrvtionName = resrvationToUpdate.getName()
    const preRsrvtionAmount = resrvationToUpdate.getAmount()
    console.log(resrvationToUpdate)
    resrvationToUpdate.setName(name)
    resrvationToUpdate.setTicketsAmount(ticketsAmount)
    this.emit(eventsConfig.updateTicket, name, ticketsAmount, rsrvtionID, prevRsrvtionName, preRsrvtionAmount, loger)
  }
}

module.exports = () => {
  const eventTicket = new ReservationManager()
    .on(eventsConfig.addTicket, (name, ticketsAmount, newTicketID, loger) => {
      console.log('first')
      loger.addToLog(`${name} got ${ticketsAmount} tickets\treservation ID: ${newTicketID}`)
    })
    .on(eventsConfig.getAllTickets, (loger) => {
      loger.addToLog('Admin asked for all tickets ')
    })
    .on(eventsConfig.deleteAll, (loger) => {
      loger.addToLog('Admin deleted all reservations')
    })
    .on(eventsConfig.deleteOneReservation, (loger, rsrvtionID) => {
      loger.addToLog(`Reservation ${rsrvtionID} has beed deleted`)
    })
    .on(eventsConfig.updateTicket, (newName, newTicketsAmount, rsrvtionID, prevName, prevAmount, loger) => {
      loger.addToLog(`Reservation ${rsrvtionID} has been changed from name: ${prevName} to ${newName}. Amount changed from: ${prevAmount} to ${newTicketsAmount}`)
    })
  return eventTicket
}
