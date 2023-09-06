const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todoo").then(()=>{
    console.log("connected successfully");
    
    // app.listen(4000);
}).catch((error)=>{
    console.log("error", error);
});

app.get('/',(req,res)=>{
    res.send("api running")
});