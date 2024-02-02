const mongoose =require("mongoose")
const userschema= new mongoose.Schema({

name:{

type:String,
require:true,

},

Email:{
type:String,
require:true,

},
phone:{

type:String,
require:true,
},
Image:{
type:String,
require:true,
},
created:{
type:Date,
require:true,
default: Date.now(),



},



}) ;

module.exports=mongoose.model("users",userschema);







