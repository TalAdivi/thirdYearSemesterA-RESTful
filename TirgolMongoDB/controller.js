const { user, order, restaurant } = require('./data');

exports.restaurantController = {
    get(req, res) {
        if (req.params && req.params.id) {
            const { id } = req.params;
            console.log('single data requested');
            res.json(restaurant[id - 1]);
        } else {
            console.log('all data requested');
            res.json(restaurant);
        }
    },
    post(req, res) {
        console.log('new entity saved!');
        const { body } = req;
        restaurant.push(body);
        res.send('new entity saved!');
    },
};

exports.userController = {
    get(req, res) { },
    post(req, res) { },
    put(req, res) { },
};

exports.orderController = {
    get(req, res) { },
    post(req, res) { },
    put(req, res) { },
    delete(req, res) { },
};