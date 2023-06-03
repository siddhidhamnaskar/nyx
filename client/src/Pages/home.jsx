import { useEffect, useState } from "react";
import Navabar from "../Components/Navabar";
import { base_url } from "../services/API";
import BasicCard from "../Components/card";



export default function Home(){
   const [data,setData]=useState([]);
   useEffect(()=>{

    fetch(`${base_url}`)

   },[])


    return <>
    <Navabar/>
    <div className="blogContainer">

        {
            data.map((elem)=>{
                return <BasicCard key={elem._id} {...elem}/>
            })
        }

    </div>


    
    
    </>
}