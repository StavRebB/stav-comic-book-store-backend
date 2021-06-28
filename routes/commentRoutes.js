const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/uploads/'});
const commentController = require('../controllers/commentController');

//GET all
router.get('/', commentController.findAllComments);

router.get('/commentsbypost/:postid', commentController.findCommentsByPost);

//GET one
router.get('/:id', commentController.findOneComment);

router.post('/', upload.none(), commentController.addComment);

router.put('/:id', upload.none(), commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

module.exports = router;