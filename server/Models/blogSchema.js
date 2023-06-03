
const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
    title:{type:String,required:true},
    summary:{type:String,required:true},
    img:{data:Buffer,ContentType:String},
    content:{type:"String",required:true},
},{
    timestamps:true
})

const blogModel=mongoose.model("blog",blogSchema);

module.exports=blogModel