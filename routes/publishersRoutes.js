const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController')
const multer = require('multer')
const upload = multer({dest: '/uploads/'})

router.get('/', publisherController.findAll);

router.get('/:id', publisherController.findOnePublisher);

router.post('/', upload.none(), publisherController.addPublisher);

router.put('/:id', upload.none(), publisherController.updatePublisher);

router.delete('/:id', publisherController.deletePublisher);

module.exports = router;