const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});
const orderController = require('../controllers/orderController');

//GET all
router.get('/', orderController.findAllOrders);

router.get('findbyhash/:hash', orderController.findOrderByHash);

//GET one
router.get('/:id', orderController.findOneOrder);

router.post('/', upload.none(), orderController.addOrder);

router.put('/:id', upload.none(), orderController.updateOrder);

router.delete('/:id', orderController.deleteOrder);

module.exports = router;