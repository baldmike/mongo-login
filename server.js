const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session')

mongoose.Promise = global.Promise

const port = process.env.PORT || 8080;

var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, './client/static')));

app.use(session({secret: 'supersecretword'}));

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');

 var routes_setter = require('./server/config/routes.js');
 routes_setter(app);

 app.listen(port, () => {
     console.log('All ears on port ' + port);
 });