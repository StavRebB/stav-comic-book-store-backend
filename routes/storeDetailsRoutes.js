const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/tmp/uploads/'});
const storeDetailsController = require('../controllers/storeDetailsController');

//GET all
router.get('/', storeDetailsController.findAllDetails);

//GET one
router.get('/:id', storeDetailsController.findOneStoreDetails);

router.post('/', upload.none(), storeDetailsController.addStoreDetails);

router.put('/:id', upload.none(), storeDetailsController.updateStoreDetails);

router.delete('/:id', storeDetailsController.deleteStoreDetails);

module.exports = router;