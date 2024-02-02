// imports
require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 4000;  // Use uppercase PORT
 
//database connection
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology:true
});
const dB =mongoose.connection;
dB.on("error",(error)=>console. log (error));
dB.once("open",()=>console.log("connected with database"));

//middlewarere
app.use(express.urlencoded({extended:false}));
app.use(express.json());
 
app.use(
    session({
     secret:("my secret key"),
    saveUninitialized:true,
    resave:false
    })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// template engine
app.set("veiw engine","ejs");
// routes
app.use("",require("./routes/routes"));

app.listen(port, () => {
  console.log(`Server is connected at http://localhost:${port}`);
});




