const Emitter = require('events');
const emitter = new Emitter();

emitter.on('fire', () => console.log('who called fire?!'));
emitter.on('fire', () => console.log('who called fire again 🤔?!'));

emitter.emit('fire');
