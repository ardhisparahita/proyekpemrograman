const router = require('express').Router();

const auth = require('../middleware/auth');
const deliveryController = require('../controllers/DeliveryController');

router.post('/', auth, deliveryController.createDelivery);

router.post('/pod', auth, deliveryController.uploadPOD);

module.exports = router;