// Callbacks
function displayBalance() {
    console.log(`account balance is: ${this.balance}`);
}

function checkOverdraw() {
    if (this.balance < 0)
        console.log(`account overdrawn! ${this.balance}`);
}

function checkGoal(acc, goal) {
    if (acc.balance > goal)
        console.log(`goal achieved! ${acc.balance}`);
}

const acc = new Account();

acc.on('balanceChanged', displayBalance);
acc.on('balanceChanged', checkOverdraw);
acc.on('balanceChanged', () => {
    checkGoal(this, 1000);
});
