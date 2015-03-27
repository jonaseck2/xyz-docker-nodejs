var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Softhouse - Upload', page: 'Admin page' });
});

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log('Posting file');
  console.log(req.files.displayImage.buffer.toString('base64'));
  res.render('admin', { title: 'Softhouse - Upload', page: 'Admin page' });
});

module.exports = router;
