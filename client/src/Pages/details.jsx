import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base_url } from "../services/API";
// import {formatISO9075} from "date-fns";


export default function Details(){

    const [data,setData]=useState({img:[]});
    const {id}=useParams();

    useEffect(()=>{

        fetch(`${base_url}/blogs/${id}`)
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            console.log(json.img);
            setData(json);

        })

    },[])

    return <>
    <Paper elevation={20} style={{width:"50%",margin:"auto",marginTop:"20px",padding:"30px"}}>
       <h1>{data.title}</h1>

       <h4>{data.summary}</h4>

       <Typography>
       
          
          <h5>{data.createdAt}</h5>
        </Typography>

        <h2>Content:</h2>
        <div dangerouslySetInnerHTML={{__html:data.content}}/>

        <h2>Images:</h2>
        <div className="imageContainer">
        {data.img.map((elem)=>{
           return <img src={elem} />
        })}

        </div>
       






    </Paper>
    
    
    
    </>

}