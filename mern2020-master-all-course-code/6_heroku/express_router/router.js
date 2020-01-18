const { Router } = require('express');
const {
  orderController,
  userController,
  restaurantController,
} = require('./controller');

const restaurantRouter = new Router();
const userRouter = new Router();
const orderRouter = new Router();

restaurantRouter.get('/all', restaurantController.get);
restaurantRouter.get('/:name', restaurantController.get);
restaurantRouter.post('/review', restaurantController.post);

userRouter.get('/:id', userController.get);
userRouter.post('/', userController.post);
userRouter.put('/update/:id', userController.put);

orderRouter.get('/:id', orderController.get);
orderRouter.post('/', orderController.post);
orderRouter.put('/update/:id', userController.put);
orderRouter.delete('/:id', orderController.delete);

module.exports = {
  restaurantRouter,
  userRouter,
  orderRouter,
};
