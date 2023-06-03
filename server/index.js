const express =require("express");
const dotenv=require('dotenv');

dotenv.config();
const app=express();
// const server=require("http").createServer(app);
// const io=require('socket.io')(server,{cors:{origin:'*'}})


const PORT=process.env.PORT;

app.use(cors());
app.listen(PORT,()=>{
    try{
        console.log(`server running on ${PORT}`);
    }
    catch(err){
        console.log("Connection Failed");
    }
})

// io.on('connection',(socket)=>{
//     console.log("User Connected :"+socket.id)

// })



