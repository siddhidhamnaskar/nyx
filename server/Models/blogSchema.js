
const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
    Image:{type:String,required:true},
    Title:{type:String,required:true},
    Price:{type:Number,required:true},
    Color:{type:String,required:true},
    Mileage:{type:Number,required:true},
    Discription:{type:String}
    // Author:{type:Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:true
})

const blogModel=mongoose.model("blog",blogSchema);

module.exports=blogModel