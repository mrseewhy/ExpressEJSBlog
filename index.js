const express = require('express');
const app = express();
const mongoose = require("mongoose")
const article = require('./models/articles')
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const session = require("express-session")
const expressValidator = require('express-validator');
const flash = require("connect-flash")
const config = require("./config/database")
const passport = require('passport')

//connect to database
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
//check for db errors
db.on('error', (error)=> console.error(error))
//check if connection is good
db.once('open', ()=> console.log('Database connected'))

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
//app.use(expressValidator(middlewareOptions));
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }))

app.use(require('connect-flash')());
app.use(function (req, res, next) {
res.locals.messages = require('express-messages')(req, res);
next();
});

// app.use(expressValidator ({
//     errorFormatter: function(param, msg, value){
//         var namespace = param.split('.'),
//         root = namespace.shift(),
//         formParam = root;

//         while(namespace.length){
//             formParam += '[' + namespace.shift() + ']';
//         }
//         return {
//             param : formParam,
//             msg : msg,
//             value: value
//         };
//     }
// }));

require('./config/passport')(passport)

app.use(passport.initialize())
app.use(passport.session())


//routes
app.get("/", (req, res) => {
    article.find({}, (err, articles) => {
        if(err){
            console.error(err)
        } else{
            res.render("index", {title: "Articles", articles: articles})
        }
    })
    });

const articles = require("./routes/articles")
app.use("/", articles)
const users = require("./routes/users")
app.use("/users", users)
app.listen(8000, ()=>console.log("Server started on port 8000"));