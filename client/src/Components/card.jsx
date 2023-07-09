import * as React from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom"
import { base_url } from '../services/API';
import { store } from "../Redux/store";
import { getData } from "../Redux/actions";




export default function BasicCard({title,summary,content,img,createdAt,updatedAt,_id}) {
  const deletePost=(_id)=>{
    alert("Do you want to delete this post")
      fetch(`${base_url}/delete/${_id}`,{
        method:"DELETE",
       
      })
      .then((res)=>{
          return res.json()
      })
      .then((json)=>{
        alert("Post Deleted Succesfully")
        fetch(`${base_url}/blogs`)
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            console.log(json);
            store.dispatch(getData(json));
        })
    
      })

  }




  return <>
  
    <Card style={{ width:"50%",margin:"auto",border:"blue" }}>
      <CardContent>
     
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {summary}
        </Typography>
        <Typography variant="body2">
          {createdAt}
          
        
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/details/${_id}`}><Button size="small">Learn More</Button></Link>
        <Link to={`/edit/${_id}`}><Button size="small">Edit</Button></Link>
        <Button size="small" onClick={()=>deletePost(_id)}>Delete</Button>
      </CardActions>
    </Card>
    </>
}