const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});
const statusController = require('../controllers/statusController');

//GET all
router.get('/', statusController.findAllStatus);

//GET one
router.get('/:id', statusController.findOneStatus);

router.post('/', upload.none(), statusController.addStatus);

router.put('/:id', upload.none(), statusController.updateStatus);

router.delete('/:id', statusController.deleteStatus);

module.exports = router;