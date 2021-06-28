const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});
const roleController = require('../controllers/roleController')

router.get('/', roleController.findAllRoles);

router.get('/:id', roleController.findOneRole);

router.post('/', upload.none(), roleController.addRole);

router.put('/:id', upload.none(), roleController.updateRole);

router.delete('/:id', roleController.deleteRole);

module.exports = router;