const { Router } = require('express');
const router = new Router();
const CoacherController = require('./coacherController');

router.post('/post', (req, res) => {
  console.log('inside post');
//   CoacherController.createCoacher(req, res);
});

router.post('/newCoacher', (req, res) => {
  CoacherController.createCoacher(req, res);
})

router.delete('/deleteCoacher/:id', (req, res) => {
  CoacherController.deleteCoacher(req, res);
})

router.get('/allCoachers', (req, res) => {
  CoacherController.getAllCoacher(req, res);
})

router.get('/coacher/:id', (req, res) => {
  CoacherController.getCoacher(req, res);
})

router.all('*', (req, res) => {
  res.status(404).send('This rout is not avileble..')
})

module.exports = router;
