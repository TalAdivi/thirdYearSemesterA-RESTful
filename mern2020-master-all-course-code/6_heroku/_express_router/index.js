const Express = require('express');
const logger = require('morgan');
const app = Express();
const PORT = process.env.PORT || 3000;

const { orderRouter, restaurantRouter, userRouter } = require('./router');

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/restaurant', restaurantRouter);
app.use('/user', userRouter);
app.use('/account', orderRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log('Express server is running on port ', PORT));
