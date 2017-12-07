/*jshint esversion: 6 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, './client/static')));

app.use(session({secret: 'helvetica'}));

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');

 var routes_setter = require('./server/config/routes.js');
 routes_setter(app);

 app.listen(port, () => {
     console.log('All ears on port ' + port);
 });