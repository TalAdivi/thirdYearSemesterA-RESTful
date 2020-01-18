const EventEmmiter = require('events');
var eventsConfig = require('./config');

module.exports = class SayHello extends EventEmmiter {
    constructor() {
        super();
        this.hello = 'Hello world';
    }
    hola(data) {
        console.log(`${this.hello}: ${data}`);
        this.emit(eventsConfig.hello, data);
    }
}