require('./db_connection');

const User = require('./user');

const user = new User({
  username: 'Maxime_Nienow12',
  email: 'Sherwood@rosamond.me',
  name: 'Yossi Maxime',
  phone: ['586.493.6943 140', '986.493.6943 456'],
  website: 'jacynthe.com',
  age: 22,
  address: {
    geo: [{ lat: 0.783738, lng: 0.28928 }],
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

  console.log('new user has been saved!', result);
});
