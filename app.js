var express = require('express');

var todoController = require('./controllers/todoController')

var app = express();


//set template engine
app.set('view engine','ejs')

//use static files using express middleware
app.use(express.static('./public'));

//use the controller
todoController(app);

//Listens to port 3000
app.listen(3000);
console.log("Listening to port 3000");