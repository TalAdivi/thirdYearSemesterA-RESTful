require('./db_connection_promise_based');

const mongoose = require('mongoose');
const User = require('./User');

mongoose.connection.on('open', () => {
  /* findAll() */
  User.find({}, (err, result) => {
    if (err)
      throw err;

    console.log(result);
  });

  /* findOne() */
  User.find({
    id: 20,
    // url: 'https://avatars0.githubusercontent.com/u/20?v=4',
  },
  (err, result) => {
    if (err)
      throw err;

    console.log(result);
  });

  /* findMany({}) */
  User.find({
    $or: [
      { url: 'https://api.github.com/users/ezmobius' },
      { id: { $gte: 10, $lte: 20 } },
    ],
  },
  (err, result) => {
    if (err)
      throw err;

    console.log(result);
  });

  /* insert() */
  const user = new User({
    type: 'Admin',
    login: 'xyztytx',
    id: 20,
    avatar_url: 'https://avatars0.githubusercontent.com/u/5',
    gravatar_id: '',
    url: 'https://api.github.com/users/xyztytx',
    html_url: 'https://github.com/xyztytx',
    repos_url: 'https://api.github.com/users/xyztytx/repos',
    site_admin: false,
  });

  user.save(
    err => {
      if (err)
        throw err;

      console.log(`Saved document: ${JSON.stringify(user)}`);
    });

  /* updateOne() */
  User.updateOne({ id: 20 }, {
    starred_url: 'https://api.github.com/users/brynary/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/brynary/subscriptions',
    organizations_url: 'https://api.github.com/users/brynary/orgs',
    repos_url: 'https://api.github.com/users/brynary/repos',
    events_url: 'https://api.github.com/users/brynary/events{/privacy}',
  },
  (err, result) => {
    if (err)
      throw err;

    console.log(`Saved document: ${JSON.stringify(result)}`);
  });

  /* updateOne() */
  User.updateOne({ id: 20 }, { $pop: { login: -1 } },
    (err, result) => {
      if (err)
        throw err;

      console.log(`Saved document: ${JSON.stringify(result)}`);
    });

  // QA:
  User.find({
    id: 20,
  },
  (err, result) => {
    if (err)
      throw err;

    console.log(result);
  });

  /* deleteMany() */
  const conditions = { id: { $in: [1, 2, 3, 4] } };

  User.deleteMany(conditions,
    (err, result) => {
      if (err)
        throw err;

      console.log(result);
    });
});
