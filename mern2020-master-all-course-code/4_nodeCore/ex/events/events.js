var Emitter = require('events')
var moment = require('moment')
var eventsConfig = require('./config').events
var myEmtr = new Emitter()

myEmtr
    .on(eventsConfig.TIME, () => {
        console.log(`The time now is: ${moment().format("DD-MM-YYYY")}`)
    })

myEmtr.emit(eventsConfig.TIME)  