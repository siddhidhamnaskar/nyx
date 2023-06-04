import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom"

const bull = (
  <Box
    component="span"
     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({title,summary,content,img,createdAt,updatedAt,_id}) {
  return <>
    <BasicCard/>
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
          <br />
        
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/details/${_id}`}><Button size="small">Learn More</Button></Link>
      </CardActions>
    </Card>
    </>
}