var path = require('path');
var express = require('express');
var app = express();

app.get('/userEmail', function (req, res) {
    res.send(JSON.stringify({email: 'tobbe@softhouse.se'}));
});

// You probably want to change 'dist/' to '../dist/' for production
app.use('/', express.static(path.join(__dirname, '../src/')));
var server = app.listen(9000, function () {
    console.log('Server started: http://localhost:%s/', server.address().port);
});
