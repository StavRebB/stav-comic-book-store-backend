const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});
const formatController = require('../controllers/formatController')

router.get('/', formatController.findAllFormats);

router.get('/:id', formatController.findOneFormat);

router.post('/', upload.none(), formatController.addFormat);

router.put('/:id', upload.none(), formatController.updateFormat);

router.delete('/:id', formatController.deleteFormat);

module.exports = router;