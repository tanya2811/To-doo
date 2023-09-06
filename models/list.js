const mongoose =require('mongoose')

const todoschema= new mongoose.Schema({
    task:{
        type:String,
        required:true    //validation
    },
    
});


const List= mongoose.model('List', todoschema);

module.exports=List;
