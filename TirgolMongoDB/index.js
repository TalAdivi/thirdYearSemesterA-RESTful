const express = require('express')
const logger = require('morgan')
const app = express();
const { orderRouter, restaurantRouter, userRouter } = require('./router')
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'));

app.use('/restaurant', restaurantRouter);
app.use('/user', userRouter);
app.use('/account', orderRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log('Express server is running on port ', port));

