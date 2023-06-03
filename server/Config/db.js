const mongoose=require("mongoose");

const connection=async()=>{
    await mongoose.connect();
}