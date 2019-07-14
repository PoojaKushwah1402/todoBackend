const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

const jsonParser = bodyParser.json();



var todos = [];

app.use(express.static('src'))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    next();
});

app.listen(port, function() {
    console.log(`Server listening on port ${port}!`);
});

app.delete("/todos/:id", jsonParser, function (req, res) {
    const itemId = req.params.id;

    todos = todos.filter(function(obj){
        return !(String(obj.id) === itemId);
    });

    res.json({
        success: true,
        msg: "Todo saved Successfull",
        data: todos
    });
});

app.post("/todos", jsonParser, function(req, res) {
    const X = req.body;
    todos.push(X);

    res.json({
        success: true,
        msg: "Todo saved Successfull",
        data: todos
    });
});

app.put('/todos', jsonParser, function (req, res) {
    const X = req.body;
    
    todos = X;
    res.json({
        success: true,
        msg: "Todo saved Successfull",
        data: todos
    });

    // if(X.do === 'add'){
    //     todos.push(X);
    // }
    // else{
    //     todos = todos.filter(function(obj){
    //      return !(obj.id === X.id);
    // })
    //  }
    // console.log(todos);
    // res.json({
    //     success: true,
    //     msg: "Todo saved Successfull",
    //     data: todos
    // });

});

app.get('/todos', function (req, res) {
    // res.setHeader('Content-Type', 'application/json');

    const response = {
        success: true,
        msg: "Todo Fetched Successfull",
        data: todos
    };

    res.json(response);
});

app.all('*', function (req, res) {
    res.status(500);
    res.send('Method Not found. No Api for this url.');
});

// class Response {
//     constructor() {
//         this.status = 200;
//     }

//     status(code)  {
//         this.status = code;
//         return this;
//     }

//     send() {
//         // send
//     }
// }