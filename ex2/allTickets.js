let TOTAL_TICKETS_AMOUNT = 0
const { EventEmitter } = require('events')
const eventsConfig = require('./config').events
const oneTicket = require('./tickets')

class ReservationManager extends EventEmitter {
  constructor () {
    super()
    this.allTikets = new Map()
  }

  addTicket (name, ticketsAmount, loger) {
    if (TOTAL_TICKETS_AMOUNT + ticketsAmount <= 10) {
      const newTicket = oneTicket(name, ticketsAmount)
      this.allTikets.set(newTicket.id, newTicket)
      TOTAL_TICKETS_AMOUNT += ticketsAmount

      this.emit(eventsConfig.addTicket, name, ticketsAmount, newTicket.id, loger)
      return newTicket.getID()
    } else {
      this.emit(eventsConfig.noMoreTicket, loger)
      return -1
    }
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
    TOTAL_TICKETS_AMOUNT = 0;

    this.emit(eventsConfig.deleteAll, loger)
  }

  deleteOneReservation (rsrvtionID, loger) {
    const id = parseInt(rsrvtionID)
    const amountToDiscard = this.allTikets.get(id).getAmount()
    console.log(amountToDiscard);
    TOTAL_TICKETS_AMOUNT -= amountToDiscard
    this.allTikets.delete(id)

    this.emit(eventsConfig.deleteOneReservation, loger, rsrvtionID)
  }

  updateTicket (rsrvtionID, newName, newTicketsAmount, loger) {
    const id = parseInt(rsrvtionID)
    const resrvationToUpdate = this.allTikets.get(id)
    const prevRsrvtionName = resrvationToUpdate.getName()
    const preRsrvtionAmount = resrvationToUpdate.getAmount()
    resrvationToUpdate.setName(newName)
    if (this.canUpdateNewAmount(preRsrvtionAmount, newTicketsAmount)) {
      resrvationToUpdate.setTicketsAmount(newTicketsAmount)
      this.emit(eventsConfig.updateTicket, newName, newTicketsAmount, rsrvtionID, prevRsrvtionName, preRsrvtionAmount, loger)
      return true;
    } else {
      this.emit(eventsConfig.notEnoughTickets, prevRsrvtionName, newTicketsAmount, rsrvtionID, loger)
      return false;
    }
  }

  canUpdateNewAmount (preRsrvtionAmount, newTicketAmount) {
    if (preRsrvtionAmount > newTicketAmount) {
      TOTAL_TICKETS_AMOUNT -= (preRsrvtionAmount - newTicketAmount);
      return true;
    }
    if (preRsrvtionAmount < newTicketAmount) {
      if (((TOTAL_TICKETS_AMOUNT - preRsrvtionAmount) + newTicketAmount) <= 10) {
        TOTAL_TICKETS_AMOUNT += (newTicketAmount - preRsrvtionAmount)
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}

module.exports = () => {
  const eventTicket = new ReservationManager()
    .on(eventsConfig.addTicket, (name, ticketsAmount, newTicketID, loger) => {
      console.log('*add ticket fired*')
      loger.addToLog(`${name} got ${ticketsAmount} tickets\treservation ID: ${newTicketID}`)
    })
    .on(eventsConfig.getAllTickets, (loger) => {
      console.log('*get all tickets fired*')
      loger.addToLog('Admin asked for all tickets ')
    })
    .on(eventsConfig.deleteAll, (loger) => {
      console.log('*delete all tickets fired*')
      loger.addToLog('Admin deleted all reservations')
    })
    .on(eventsConfig.deleteOneReservation, (loger, rsrvtionID) => {
      console.log('*delete one ticket fired*')
      loger.addToLog(`Reservation ${rsrvtionID} has beed deleted`)
    })
    .on(eventsConfig.updateTicket, (newName, newTicketsAmount, rsrvtionID, prevName, prevAmount, loger) => {
      console.log('*update one ticket fired*')
      loger.addToLog(`Reservation ${rsrvtionID} has been changed from name: ${prevName} to ${newName}. Amount changed from: ${prevAmount} to ${newTicketsAmount}`)
    })
    .on(eventsConfig.noMoreTicket, (loger) => {
      console.log('*no more tickets fired*')
      loger.addToLog('There is not enough tickets.')
    })
    .on(eventsConfig.notEnoughTickets, (name, newTicketsAmount, rsrvtionID, loger) => {
      console.log('*not enough tickets fired*')
      loger.addToLog(`Reservation id: ${rsrvtionID} cant update amount because there is not enough tickets`)
    })
  return eventTicket
}
