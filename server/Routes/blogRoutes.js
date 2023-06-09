const blogs=require("../Models/blogSchema")

const router=require("express");
const blogRouter=router();
const fs =require('fs');

const dotenv=require("dotenv");
dotenv.config();
const cloudinary=require("cloudinary");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET

})

const upload=require('../ImageUpload/multer')



blogRouter.get("/blogs",async(req,res)=>{

    try{
      console.log(1);
        const blog=await blogs.find().sort({createdAt:-1})
        res.status(200).json(blog)

    }
    catch(err){
       res.status(505).json(err)
    }

})

blogRouter.get("/blogs/:id",async(req,res)=>{
    try{
      const blog=await blogs.findById(req.params.id)
      res.status(200).json(blog)
  
    }
    catch(err){
      res.status(505).json(err);
    }
  })



  

blogRouter.post("/post",upload.array('file[]',50),async(req,res)=>{
    try{
      

         const urls=[];
        const files=req.files;
        
        for(const file of files)
        {
          const {path}=file;
          const res=await cloudinary.uploader.upload(path)
          // console.log(res.secure_url);
          urls.push(res.secure_url);
          // console.log(urls[0]);
           fs.unlinkSync(path);

        }
         
         
      
        
     

        // console.log(urls);
        const post=new blogs({
          Image:urls[0],
          Title:req.body.title,
          Price:req.body.price,
          Color:req.body.color,
          Mileage:req.body.mileage,
          Discription:req.body.discription,
          Author:req.body.id
          
          })
          const posts=await post.save();
          res.status(200).json(posts);
    }
    catch(err){

        res.status(505).json(err)
    }

    
})

blogRouter.put("/edit/:id",upload.array('file[]',50),async(req,res)=>{
    try{
      const blog=await blogs.findById(req.params.id)
       blog.title=req.body.title;
       blog.summary=req.body.summary;
       blog.content=req.body.content;
       if(req.files)
       {
        const urls=[];
        const files=req.files;
        
        for(const file of files)
        {
          const {path}=file;
          const res=await cloudinary.uploader.upload(path)
          //  console.log(res.secure_url);
          urls.push(res.secure_url);
          // console.log(urls[0]);
           fs.unlinkSync(path);

        }
        blog.img=urls
  
       }
  
  
       const post=await blog.save();
       res.status(200).json(post);
  
  
    }
    catch(err){
        res.status(505).json(err)
  
    }
  
  })

  blogRouter.delete("/delete/:id",async(req,res)=>{
    try{

        const blog=await blogs.findByIdAndDelete(req.params.id);
        res.status(200).json(blog);

    }
    catch(err){
        res.status(505).json(err)

    }
  })


  
  module.exports=blogRouter;

