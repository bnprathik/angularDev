const express = require('express');
const path = require('path');
const bodyParser =require('body-parser');
const cors = require ('cors');
const http = require('http');
const passport = require('passport');
const mongoose =require ('mongoose');
const dbConfig = require('./config/database')
 const bookRouter = require('./routes/bookRouter');
const index = require('./routes/index');
const user = require('./routes/user');
// define our app using express
const app=express();

app.use(cors());

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


// import routes
// app.use('/',index);
app.use('/', express.static(path.join(__dirname, 'dist/index.html')));
app.use('/books', bookRouter);
app.use('/user', user);
const hostname = 'localhost';
// set the port
const port = 3000;
// connect to database
const url = 'mongodb://localhost:27017/librarymanagement';
const connect = mongoose.connect(dbConfig.database);
console.log('in app.js')
console.log(url)

connect.then((db) => {
    console.log("Connected correctly to server" + db);
}, (err) => { console.log(err); });




// allow-cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

  var server = http.createServer(app);
// start the server


server.listen(port,hostname,()=>{
    console.log("server started");
})
// app.listen(port,()=>{
//     console.log('server started on port :${port}');
// });