var express = require('express');
var router = express.Router();
require('dotenv').config()
var transporter = require('../config/mail.config')
const multer = require('multer');
const upload = multer({dest: '/uploads/'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('getting mail');
});

router.post('/sendmailtoclient', upload.none(), function(req, res, next) {

    const mail = {
        from: process.env.THE_MAIL,
        to: req.body.clientmail,
        subject: req.body.subject,
        text: req.body.content
    }

    console.log(mail)

    transporter.sendMail(mail, (err, data) => {
        if(err) {
            res.json({
                status: 'failed',
                message: err.message
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
});

router.post('/sendmailfromclient', function(req, res, next) {

    const mail = {
        from: req.body.clientmail,
        to: process.env.THE_MAIL,
        subject: req.body.subject,
        text: req.body.content
    }

    transporter.sendMail(mail, (err, data) => {
        if(err) {
            res.json({
                status: 'failed',
                message: err.message
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
});

module.exports = router;
