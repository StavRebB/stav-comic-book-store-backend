const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const multer = require('multer');
const { nanoid } = require('nanoid')
const mime = require('mime-types')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'uploads/')
    },
    filename: function (req,file,cb) {
        /* generates a "unique" name - not collision proof but unique enough for small sized applications */
        let id = nanoid();
        /* need to use the file's mimetype because the file name may not have an extension at all */
        let ext = mime.extension(file.mimetype);
        cb(null, `${id}.${ext}`);
    }
})
  
var upload = multer({
    storage: storage, 
    fileFilter: function(req,file,cb) {
        if(!file.originalname.match("\.(jpg|jpeg|png|gif)")) {
            return cb(new Error("Only images are allowed"), false)
        } else {
            cb(null, true)
        }
    },
    limits: {
        files: 1, //allow only single file upload to server
        fileSize: 5 * 1024 * 1024 //max file size 5MB
    }
})

//GET all
router.get('/', memberController.findAllMembers);

router.get('/email/:email', memberController.findMemberByEmail);

//GET one
router.get('/:id', memberController.findOneMember);

router.post('/add', upload.single('photoSrc'), memberController.addMemberByUser);

router.patch('/:id', upload.single('photoSrc'), memberController.updateMemberByUser)

router.post('/', upload.single('photoSrc'), memberController.addMember);

router.put('/:id', upload.single('photoSrc'), memberController.updateMember);

router.delete('/:id', memberController.deleteMember);

module.exports = router;