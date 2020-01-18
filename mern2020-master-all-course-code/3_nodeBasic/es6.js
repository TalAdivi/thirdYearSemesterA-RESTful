// // var, let, const
// var x = 10
// if (x) {
//     var x = 4 // overwrites the global var x
// }
// console.log(x) // 4

// var y = 20
// if (y) {
//     let y = 5 // only inside the if scope
// }
// console.log(y) // ??

// for (let i = 0; i < 5; i++) {
//     console.log(i) // ??
// }
// // console.log(i) // ??


// /* Default parameters: */

function sayHello(prefix = 'Mr.', name = 'guest') {
    console.log(`Hello, ${prefix} ${name}`)
}
sayHello() // ??
sayHello(undefined, null) // ??
sayHello('', 'Yossi') // ??
sayHello('John', 'Doe') // ??


/* Arrow functions vs Functions */

this.z = 'outer scope'

const obj = {
    z: 'inner scope',
    print: function () {
        console.log('z belongs to the', this.z)
    },
    arrow_print: () => {
        console.log('z belongs to the', this.z)
    }

}

obj.print()
obj.arrow_print()


// /* Destructors */

// const pizzaSizes = ['slice', 'half-pie', 'full-pie']
// const [_slice, halfPie, _fullPie] = pizzaSizes
// const [slice, , fullPie = 'full-pie'] = pizzaSizes
// console.log(fullPie)

// const myObj = {
//     "success": true,
//     "data": [
//         {
//             "fname": "Maurine",
//             "lname": "Rath",
//             "email": "mrath@edison.info",
//             "mobile": "657-744-7946",
//             "photo": "https://s3.amazonaws.com",
//             "lat": "-3.4323",
//             "lon": "-129.6178"
//         },{
//             "fname": "Giuseppe",
//             "lname": "Jacobs",
//             "email": "gjacobs@everardo.name",
//             "mobile": "1-342-063-5761 x4105",
//             "photo": "https://s3.amazonaws.com/uifaces",
//             "lat": "5.7290",
//             "lon": "-25.9692"
//         }
//     ]
// }
// const { data } = myObj


// /* Deep destruction + rename */

// const { data: { 0: { email } } } = myObj
// console.log(email) // mrath@edison.info

// const { success: status } = myObj


// // /* Short properties */

// ES5 properties
var foo = {
    x: x,
    y: y,
    z: z,
};

// ES5 methods
var foo = {
    a: function() {},
    b: function() {}
};

// ES6 properties
var foo = {x, y, z};

// ES6 methods
var foo = {
    a() {},
    b() {}
};

// /* rest vs spread */

// Rest
function myFun(a, b, ...manyMoreArgs) {
    console.log("a", a); 
    console.log("b", b);
    console.log("manyMoreArgs", manyMoreArgs); 
}
  
myFun("one", "two", "three", "four", "five", "six");
  
  // Console Output:
  // a, one
  // b, two
  // manyMoreArgs, [three, four, five, six]

const name = 'David'
console.log('hello world from ${name}')
