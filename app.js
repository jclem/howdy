var express = require('express'),
    path    = require('path');

var app = express();

app.set('port', process.env.PORT || 9999);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.static('public'));

app.listen(app.get('port'));
