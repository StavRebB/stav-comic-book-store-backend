const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});
const languageController = require('../controllers/languageController')

router.get('/', languageController.findAllLanguages);

router.get('/:id', languageController.findOneLanguage);

router.post('/', upload.none(), languageController.addLanguage);

router.put('/:id', upload.none(), languageController.updateLanguage);

router.delete('/:id', languageController.deleteLanguage);

module.exports = router;