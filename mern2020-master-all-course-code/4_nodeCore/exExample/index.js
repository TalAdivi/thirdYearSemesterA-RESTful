const EventEmitter = require('events');
const eventsConfig =  require('./config');
const SayHello = require('./sayHello');

const hello = new SayHello();

hello.on(eventsConfig.events.hello, 
    data => console.log(`Greeting from Node: Hi ${data}`)
);
hello.hola('Miri');