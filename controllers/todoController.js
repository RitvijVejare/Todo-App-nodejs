var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();

//Connect to database

mongoose.connect(`${process.env.uri}`,{ useNewUrlParser: true,useUnifiedTopology: true },function(err){
    if (err){
        console.log(err);
    }else{
        console.log("Connected to database");
    }
})

//Creating a schema/blueprint for data

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: "Buy Food"}).save(function(err){
//     if (err) throw err;
//     console.log("Item Saved");
// })

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// var data = [{item:"Get milk"},{item:'Walk dog'},{item:"Kick ass"}]

module.exports = function(app){
    app.get('/todo',function(req,res){
        //get data from mongodb and pass to view
        Todo.find({},function(err,data){
            if (err) throw err;
            res.render('todo',{todos:data});
        });
    });

    app.post('/todo',urlencodedParser,function(req,res){
        //Get data from view and add to mongodb
        // console.log(req.body);
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
            console.log("Item Added");
        })
    });

    app.delete('/todo/:item',function(req,res){
        //delete requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
            if (err) throw err;
            res.json(data);
            console.log("Deleted")
        })
    });
}