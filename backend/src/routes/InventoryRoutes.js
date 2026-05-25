const router = require('express').Router();

const auth = require('../middleware/auth');
const inventoryController = require('../controllers/InventoryController');

router.get('/', auth, inventoryController.getInventory);

router.post('/', auth, inventoryController.createInventory);

module.exports = router;