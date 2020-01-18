const { EventEmitter } = require('events')
// const { config } = require('./config') // ??

class Account extends EventEmitter {
    constructor() {
        super()
        this.balance = 0
    }

    deposit(amount){
        this.balance += amount
        this.emit('balanceChanged')
    }

    withdraw(amount){
        this.balance -= amount
        this.emit('balanceChanged')
    }
}

// Callbacks
function displayBalance(){
    console.log(`account balance is: ${this.balance}`)
}

function checkOverdraw() {
    if (this.balance < 0){
        console.log(`account overdrawn! ${this.balance}`)
    }
}

function checkGoal(acc, goal) {
    if(acc.balance > goal) {
        console.log(`goal achieved! ${acc.balance}`)
    }
}

const acc = new Account()
acc.on('balanceChanged', displayBalance)
acc.on('balanceChanged', checkOverdraw)
acc.on('balanceChanged', () => {
    checkGoal(this, 1000)
})

// Demo
acc.deposit(200)
acc.deposit(300)
acc.deposit(600)
acc.withdraw(1200)
