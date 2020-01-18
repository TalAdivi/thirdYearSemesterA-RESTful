const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  login: { type: String, index: true },
  id: { type: Number, required: true, unique: true },
  node_id: { type: String, default: 'MDQ6VXNlcjE=' },
  avatar_url: String,
  gravatar_id: String,
  url: String,
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url: String,
  starred_url: String,
  subscriptions_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: Boolean,
  type: { type: String, enum: ['User', 'Admin'] },
  site_admin: Boolean,
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
