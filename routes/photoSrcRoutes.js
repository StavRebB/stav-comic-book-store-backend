var express = require('express');
var router = express.Router();
var path = require('path')

/* GET images listing. */
router.get('/photoSrc/members/:photo', function(req, res, next) {
    console.log(req.params)
    var photoName = req.params.photo
    res.sendFile(path.join(__dirname, '..', 'uploads', 'photoSrc', 'members', photoName), (err) => {
        if (err)
            return res.render('error', { method: req.method, route: `/photoSrc${req.url.split('?')[0]}` })
    })
});

router.get('/photoSrc/products/:photo', function(req, res, next) {
    console.log(req.params)
    var photoName = req.params.photo
    res.sendFile(path.join(__dirname, '..', 'uploads', 'photoSrc', 'products', photoName), (err) => {
        if (err)
            return res.render('error', { method: req.method, route: `/photoSrc${req.url.split('?')[0]}` })
    })
});

router.get('/photoSrc/posts/:photo', function(req, res, next) {
    console.log(req.params)
    var photoName = req.params.photo
    res.sendFile(path.join(__dirname, '..', 'uploads', 'photoSrc', 'posts', photoName), (err) => {
        if (err)
            return res.render('error', { method: req.method, route: `/photoSrc${req.url.split('?')[0]}` })
    })
});

module.exports = router;