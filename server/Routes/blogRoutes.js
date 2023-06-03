const blogs=require("../Models/blogSchema")

const router=require("express");
const multer=require('multer');
const fs =require('fs');

router.get("/blogs",async(req,res)=>{

    try{
        const blog=await blogs.find().sort({createdAt:-1});
        res.status(200).json(blog)

    }
    catch(err){
       res.status(505).json(err)
    }

})

router.get("/blogs/:id",async(req,res)=>{
    try{
      const blog=await blogs.findById(req.params.id)
      res.json(blog);
  
    }
    catch(err){
      res.status(505).json(err);
    }
  })


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  

router.post("/post",upload.single('file'),async(req,res)=>{
    try{
        const post=new blogs({
            title:req.body.title,
            summary:req.body.summary,
            img: {
              data: fs.readFileSync("uploads/" + req.file.filename),
              contentType: "image/png",
            },
            content:req.body.content,
          
          })
          const posts=await post.save();
          res.status(200).json(posts);
    }
    catch(err){

        res.status(505).json(err)
    }

    
})

router.put("/edit/:id",upload.single('file'),async(req,res)=>{
    try{
      const blog=await blogs.findById(req.params.id)
       blog.title=req.body.title;
       blog.summary=req.body.summary;
       blog.content=req.body.content;
       if(req.file)
       {
       
        blog.img={
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/png",
        }
  
       }
  
  
       const post=await blog.save();
       res.status(200).json(post);
  
  
    }
    catch(err){
        res.status(505).json(err)
  
    }
  
  })

  router.delete("/delete/:id",async(req,res)=>{
    try{

        const blog=await blogs.findByIdAndDelete(req.params.id);
        res.status(200).json(blog);

    }
    catch(err){
        res.status(505).json(err)

    }
  })