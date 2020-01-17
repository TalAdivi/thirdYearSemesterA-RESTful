const connection = require('./db'); // First, establish connection and get connection instance
const Post = require('./post');

module.exports = {
  async getAllPosts(req, res, next) {
    const result = await Post.find({});

    if (result) {
      res.json(result);
    } else {
      res.status(404)
        .send('not found');
    }
  },
  async getPost(req, res, next) {
    const { id = null } = req.params;
    const result = await Post.findOne({ id });

    if (result) {
      res.json(result);
    } else {
      res.status(404)
        .send('not found');
    }
  },
  async editPost(req, res, next) {
    const { id = null } = req.params;
    const { title = null, body = null } = req.body;
    const result = await Post.updateOne({ id }, {
      body,
      title,
    });

    if (result) {
      res.json(result);
    } else {
      res.status(404)
        .send('not found');
    }
  },
  async addPost(req, res, next) {
    const {
      id = null,
      userId = null,
      title = null,
      body = null,
    } = req.body;
    const post = new Post({
      id,
      userId,
      title,
      body,
    });
    const result = await post.save();

    if (result) {
      res.json(result);
    } else {
      res.status(404)
        .send('not found');
    }
  },
  async removePost(req, res, next) {
    const { id = null } = req.body;
    const result = await Post.deleteOne({ id });

    if (result) {
      res.json(result);
    } else {
      res.status(404)
        .send('not found');
    }
  },
};
