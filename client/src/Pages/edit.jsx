import { Paper, TextField, Typography} from "@mui/material";
// import ResponsiveAppBar from "../Components/AppBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { base_url } from "../services/API";
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


export default function Edit(){

    const {id}=useParams();
    const [load,setLoad]=useState(false);
    const [title, setTitle]=useState("");
   const [summary ,setSummary]=useState("");
   const [content,setContent]=useState("");
   const [file,setFile]=useState("");
   const navigate=useNavigate();
   useEffect(()=>{
    fetch(`${base_url}/blogs/${id}`)
    .then((res)=>{
       res.json().then((json)=>{
       
        setTitle(json.title);
        setSummary(json.summary);
        setContent(json.content)
       });
    })
   },[])

   
   const editPost=(e)=>{
    e.preventDefault();
    setLoad(true)
      const data=new FormData();
      data.set('title',title);
      data.set('summary',summary);
         
   
    
      data.set('content',content);
      if(file)
      {
        for (let i = 0; i < file.length; i++) {
          data.append('file[]', file[i]);
       }
      }
  
      console.log(file[0]);
      fetch(`${base_url}/edit/${id}`,{
        method:"Put",
         body:data,
        

      })
      .then((res)=>{
        setLoad(false)
        alert("Updated Succesfully");
        
        navigate("/");
         
      })
      .catch((err)=>{
        alert("Please Enter Required Field");
      })
   }
   

    const inputstyle={
      
        width:"90%",
        margin:"auto",
        height:"10px",
        marginTop:"40px",
        marginBottom:"40px"
      

    }
    const paperStyle={
        width:"50%",
        height:"550px",
         margin:"auto",
        marginTop:"30px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifiedContent:"center",
        textAlign:"center"

    }
    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link'],
          ['clean'],
        ],
      };
 







    return <>

<Paper elevation={20} style={paperStyle}>
{load ?  <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>:null}
        <form style={{width:"100%",height:"100%"}} onSubmit={editPost} >
            <Typography style={{fontSize:"30px",fontWeight:"bold",marginTop:"20px"}}>Edit the POST</Typography>
            <TextField
    required
    id="outlined-required"
    type="title"
    label="Title"
    name="title"
    value={title}
    autoFocus
    onChange={(e)=>setTitle(e.target.value)}
    placeholder="Title"
    style={inputstyle} 
  />
         <TextField
    required
    id="outlined-required"
    type="summary"
    label="Summary"
    name="summary"
    value={summary}
    onChange={(e)=>setSummary(e.target.value)}
    placeholder="Summary"
    style={inputstyle} 
  />
         <TextField
         required
         id="outlined-required"
  
    type="file"
    name="file"
  
    inputProps={{
        multiple: true
      }}

    onChange={(e)=>setFile(e.target.files)}
    style={inputstyle} 
   
 
    
  />
          <ReactQuill value={content} onChange={newValue=>setContent(newValue)} style={{width:"90%",margin:"auto",marginTop:"30px"}} modules={modules}/>
          <Button style={{width:"90%",margin:"auto",height:"50px",marginTop:"20px",color:"white",fontSize:"30px"}} variant="contained" onClick={editPost}>SUBMIT</Button>
        </form>
    </Paper>
    
    </>
}