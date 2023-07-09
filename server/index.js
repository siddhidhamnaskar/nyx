const express =require("express");
const dotenv=require('dotenv');
const cors=require("cors");
dotenv.config();
const app=express();
const blogRouter=require("./Routes/blogRoutes")
const connection=require("./Config/db")
// const server=require("http").createServer(app);
const bodyparser=require("body-parser");
//  const io=require('socket.io')(server,{cors:{origin:'*'}})

//  app.set("view engine", "ejs")
 
// Body-parser middleware




const PORT=process.env.PORT;

 app.use(cors());
 app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
 

 app.use(express.json());

app.use("/",blogRouter)
app.listen(PORT,()=>{
    try{
        connection();
        console.log(`server running on ${PORT}`);
    }
    catch(err){
        console.log("Connection Failed");
    }
})

// io.on('connection',(socket)=>{
//     console.log("User Connected :"+socket.id)

// })



