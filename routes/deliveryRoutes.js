const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});
const deliveryController = require('../controllers/deliveryController');

//GET all
router.get('/', deliveryController.findAllDelivery);

//GET one
router.get('/:id', deliveryController.findOneDelivery);

router.post('/', upload.none(), deliveryController.addDelivery);

router.put('/:id', upload.none(), deliveryController.updateDelivery);

router.delete('/:id', deliveryController.deleteDelivery);

module.exports = router;