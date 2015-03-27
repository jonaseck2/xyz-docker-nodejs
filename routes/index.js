var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var options = {
        host: 'localhost',
        port: 3232,
        path: '/branding/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    getJSON(options, function(code, result) {
        console.log(result);
        res.render('index', {
            title: 'Softhouse - Download',
            page: 'Softhouse - Download',
            data: result
        });
    });
});

module.exports = router;

 function getJSON(options, onResult) {
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
}