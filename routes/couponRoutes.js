const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/tmp/uploads/'});
const couponController = require('../controllers/couponController');

//GET all
router.get('/', couponController.findAllCoupons);

router.get('/findcode/:code', couponController.findCouponByCode);

router.get('/finddiscount/:discount', couponController.findCouponByDiscount);

//GET one
router.get('/:id', couponController.findOneCoupon);

router.post('/', upload.none(), couponController.addCoupon);

router.put('/:id', upload.none(), couponController.updateCoupon);

router.delete('/:id', couponController.deleteCoupon);

module.exports = router;