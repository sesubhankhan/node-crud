const express = require("express");
const user = require("../models/users");
const router = express.Router();
const multer = require("multer");

// Image upload configuration
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    
  },
});

// Set up Multer middleware
var upload = multer({
  storage: storage,
}).single("Image"); 

//insert a user into data base and his/her data in database//
router.post("/add", upload ,(req,res) =>{
 
    const user= new user({
 
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    Image:req.file.filename,

});
user.save((err)=>{
if (err){
res.json({message:err.message,  type:"danger"});


  }else{
        req.session.message={
       type:"success",
        message:"user added successfully",
       }
       res.redirect("/");
     }

});

});





router.get("/", (req, res) => {
    res.render('index.ejs', { title: "Home page" });
});

router.get("/add",(req,res)=>{
res.render("add_users.ejs",{title:"Add Users"});
});


module.exports = router;