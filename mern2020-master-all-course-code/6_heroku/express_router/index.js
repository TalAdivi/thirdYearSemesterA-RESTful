const Express = require('express');
const logger = require('morgan'); // NOTE: for debugging
const { orderRouter, restaurantRouter, userRouter } = require('./router');
const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/restaurant', restaurantRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log('Express server is running on port ', port));
