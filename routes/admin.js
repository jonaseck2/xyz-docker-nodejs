var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Softhouse - Upload', page: 'Admin page' });
});

/* GET home page. */
router.post('/', function(req, res, next) {

    var body = req.body;
    var data = {
        category: body.category,
        subCategory: body.subCategory,
        name: body.name,
    };

    if (req.files.displayImage) {
        data.files = req.files.displayImage.buffer.toString('base64');
    }

    res.render('admin', {
        title: 'Softhouse - Upload',
        page: 'Admin page',
        data: data
    });
});


module.exports = router;
