require('./db_connection')
const mongoose = require('mongoose')

// const User = require('./users')

// const user = new User({
//   name: "Tal Adivi",
//   username: "Adiviyo",
//   email: "taladivi100@gmail.com",
//   phone: ["01234","56789"],
//   age: 121

// })

// user.save((err,result) => {
//   if(err)
//   throw err;

//   console.log('new user has been saved',result)
// })

// User.find({id: 7},(err,res) => {
//   if(err)
//     throw err;

//     console.log(res);
// })

// User.updateOne({id: 7},
//   {
//     starred_url: 'blablablalba'
//   },

//   (err,res) => {
//   if(err)
//     throw err;

//     console.log(res);
// });

// User.updateOne({ id: 7 }, {
//   $set:{
//     starred_url: 'https://api.github.com/users/brynary/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/brynary/subscriptions',
//     organizations_url: 'https://api.github.com/users/brynary/orgs',
//     repos_url: 'https://api.github.com/users/brynary/repos',
//     events_url: 'https://api.github.com/users/brynary/events{/privacy}',
//   }
//  },
//  (err, result) => {
//   if (err)
//     throw err;
 
//   console.log(`Saved document: ${JSON.stringify(result)}`);
//  })

// const conditions = { id: { $in: [1, 2, 3, 4] } };

// User.deleteMany(conditions,
//  (err, result) => {
//    if (err)
//      throw err;

//    console.log(result);
//  });



