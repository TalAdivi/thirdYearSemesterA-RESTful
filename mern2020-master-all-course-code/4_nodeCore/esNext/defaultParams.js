function sayHello(prefix = 'Mr.', name = 'guest') {
    console.log(`Hello, ${prefix} ${name}`)
}
sayHello() // Hello, Mr. guest
sayHello(undefined, undefined) // Hello, Mr. guest
sayHello(undefined, 'John') // Hello, Mr. John
sayHello('John', 'Doe') // Hello, John Doe