const loger = require('./loger')()
const ticketObj = require('./allTickets')()
const queryString = require('querystring')

const addTicket = (req, res) => {
  let body = '';
  req.on('data', chunk => { body += chunk });
  req.on('end', () => {
    const bodyJson = JSON.parse(body);
    if (jsonBodyHaveNameAmount(bodyJson)) {
      const ticketID = ticketObj.addTicket(bodyJson.name, bodyJson.amount, loger);
      if (ticketID !== -1) {
        res.end(`\nSuccess! \nYour Ticket ID is: ${ticketID}\nkeep it!`)
      } else {
        res.end('Not enough tickets\nfaild')
      }
    } else {
      res.end('Bad body\nfaild')
    }
  })
}

const getAllTickets = (req, res) => {
  let body = '';
  req.on('data', chunk => { body += chunk });
  req.on('end', () => {
    const bodyJson = JSON.parse(body);
    if (jsonBodyHaveUsrNamePass(bodyJson)) {
      if (userIsAdmin(bodyJson)) {
        res.write(`All tickets list: ${ticketObj.getAllTickets(loger)}`)
        res.end('\nsuccess')
      } else {
        res.write('Not authorized - Code 401')
        res.end('\nfail')
      }
    } else {
      res.end('Bad body\nfaild')
    }
  })
}

const getLog = (req, res) => {
  let body = '';
  req.on('data', chunk => { body += chunk });
  req.on('end', () => {
    const bodyJson = JSON.parse(body);
    if (jsonBodyHaveUsrNamePass(bodyJson)) {
      if (userIsAdmin(bodyJson)) {
        res.write(`Log -------------------\n${loger.getLogText()}`)
        res.end('\nsuccess')
      } else {
        res.write('Not authorized - Code 401')
        res.end('\nfail')
      }
    } else {
      res.end('Bad body\nfaild')
    }
  })
}

const deleteAllReservations = (req, res) => {
  let body = '';
  req.on('data', chunk => { body += chunk });
  req.on('end', () => {
    const bodyJson = JSON.parse(body);
    if (jsonBodyHaveUsrNamePass(bodyJson)) {
      if (userIsAdmin(bodyJson)) {
        res.write('Deleting all reservations')
        ticketObj.deleteAllReservations(loger)
        res.end('\nAll reservations has been deleted successfuly\nsuccess')
      } else {
        res.write('Not authorized - Code 401')
        res.end('\nfail')
      }
    } else {
      res.end('Bad body\nfaild')
    }
  })
}

const deleteOneReservation = (req, res) => {
  res.write('')
  const queryJson = queryString.parse(req.url, '?')
  if (userSendID(queryJson)) {
    if (thereIsTicketWithThisID(queryJson.id)) {
      ticketObj.deleteOneReservation(queryJson.id, loger)
      res.end(`Reservation ${queryJson.id} deleted successfuly`)
    } else {
      res.end(`There is no reservation with id: ${queryJson.id}\nfail`)
    }
  } else {
    res.end('You didnt send id to delete\nfail')
  }
}

const updateTicket = (req, res) => {
  const queryJson = queryString.parse(req.url, '?')

  if (userSendID(queryJson)) {
    if (thereIsTicketWithThisID(queryJson.id)) {
      let body = ''
      req.on('data', chunk => { body += chunk })
      req.on('end', () => {
        const bodyJson = JSON.parse(body)
        if (jsonBodyHaveNameAmount(bodyJson)) {
          const hasUpdated = ticketObj.updateTicket(queryJson.id, bodyJson.name, bodyJson.amount, loger);
          if (hasUpdated) {
            res.end(`Reservation number ${queryJson.id} updated successfuly`)
          } else {
            res.end(`Reservation number ${queryJson.id} cant update because there is not enought tickets letf\nfail`)
          }
        } else {
          res.end('Bad body\nfail')
        }
      })
    } else {
      res.end(`There is no reservation with id: ${queryJson.id}\nfail`)
    }
  } else {
    res.end('You didnt send id to delete\nfail')
  }
}

module.exports = {
  addTicket,
  getAllTickets,
  getLog,
  deleteAllReservations,
  deleteOneReservation,
  updateTicket
}

// helping functions
const jsonBodyHaveNameAmount = (bodyJson) => {
  if (bodyJson.name === undefined || bodyJson.amount === undefined) {
    return false;
  } else {
    return true;
  }
}

const jsonBodyHaveUsrNamePass = (bodyJson) => {
  if (bodyJson.user_name === undefined || bodyJson.password === undefined) {
    return false;
  } else {
    return true;
  }
}

const userIsAdmin = (bodyJson) => {
  if (bodyJson.user_name === process.env.ADMIN_NAME && bodyJson.password === process.env.ADMIN_PASS) {
    return true;
  } else {
    return false;
  }
}

const userSendID = (queryJson) => {
  if (queryJson.id === undefined) {
    return false;
  } else {
    return true;
  }
}

const thereIsTicketWithThisID = (id) => {
  id = parseInt(id);
  if (ticketObj.allTikets.has(id)) {
    return true;
  } else {
    return false;
  }
}
