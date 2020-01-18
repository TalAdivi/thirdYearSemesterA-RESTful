const Emitter = require('events');
const moment = require('moment');

const eventsConfig = require('./config').events;
const myEmtr = new Emitter();

myEmtr
  .on(eventsConfig.TIME, () => {
    console.log(`time is: ${moment().format('YYYY-MM-DD')}`);
  })
  .on(eventsConfig.HELLO, () => {
    console.log('who called hello again??');
  });

myEmtr.emit(eventsConfig.TIME);
myEmtr.emit(eventsConfig.HELLO);
