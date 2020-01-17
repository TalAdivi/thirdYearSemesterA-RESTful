const mongoose = require('mongoose');
const connection = require('./db_connection');
const User = require('./user');

connection.on('open', () => {
  const user = new User({
    username: 'Maxime_Nienow34',
    email: 'Sherwood@rosamond.me',
    phone: '586.493.6943 x140',
    website: 'jacynthe.com',
    address: {
      geo: [{ lat: '783738', lng: '28928' }],
      street: 'Dayna Park',
      suite: 'Suite 449',
      city: 'Bartholomebury',
      zipcode: '76495-3109',
    },
    company: {
      name: 'Yost and Sons',
      catchPhrase: 'Switchable contextually-based project',
      bs: 'aggregate real-time technologies',
    },
  });

  user.save((err, result) => {
    if (err)
      throw err;

    console.log(result);
    mongoose.disconnect();
  });
})
// const allUsers = await User.find({ name: "Michal" })
// console.log('%o', allUsers)

/* find() */

// .then(() => {
//     User.find({
//         name: 'Krystal Choulerton',
//         age: {$gte: 30, $lte: 50}
//     },
//         (err, result) => {
//             if(err) throw err
//             console.log(result)
//             mongoose.disconnect()
//         })
// })

/* insert() */

// .then(() => {
//     const user = new User({
//         name: "Nimrod",
//         age: 20,
//         status: "A",
//         groups: ["sports", "music", "books"]
//     });

//     user.save(
//         (err) => {
//             if(err)
//             console.log(`err: ${err}`);
//             else {
//                 console.log(`Saved document: ${JSON.stringify(user)}`);
//                 mongoose.disconnect();
//             }
//         });
//     })

/* validation */

// .then(() => {
//     const user = new User({
//         name: 'Nimrod',
//         age: 20,
//         status: 'A',
//         groups: ['sports', 'music', 'books'],
//         city: 'Tel-Aviv'
//     })

//     user.save(
//         (err) => {
//             if(err)
//             console.log(`err: ${err}`)
//             else {
//                 console.log(`Saved document: ${JSON.stringify(user)}`)
//                 mongoose.disconnect()
//             }
//         });
//     })

/* update */

// .then(() => {
//     const conditions = { name: "Michal" }
//     const options = {}
//     const doc = {
//         $set: { name: "Michael", age: 77 },
//         $push: { groups: 'TV' }
//     }

//     User.updateOne(conditions, doc, options,
//         (err, result) => {
//             if (err)
//                 console.log(`err: ${err}`);
//             else {
//                 console.log(JSON.stringify(result))

//                 mongoose.disconnect();
//             }
//         })
// })

/* delete */

// .then(() => {
//     const conditions = { name: "Michael" }

//     User.deleteOne(conditions,
//         (err, result) => {
//             if (err)
//                 console.log(`err: ${err}`);
//             else {
//                 console.log(JSON.stringify(result))

//                 mongoose.disconnect();
//             }
//         })
// })
  .catch(err => console.error('some error occurred', err));
