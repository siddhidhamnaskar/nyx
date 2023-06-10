import { useEffect, useState } from "react";
import Navabar from "../Components/Navabar";
import { base_url } from "../services/API";
import BasicCard from "../Components/card";
import { store } from "../Redux/store";
import { getData } from "../Redux/actions";


export default function Home(){
   const [data,setData]=useState([]);
   

   store.subscribe(()=>{
      setData(store.getState().data);
   })

   useEffect(()=>{

    fetch(`${base_url}/blogs`)
    .then((res)=>{
        return res.json();
    })
    .then((json)=>{
        console.log(json);
        store.dispatch(getData(json));
    })

   },[])


    return <>
   
  
    <div className="blogContainer">

        {
            data.map((elem)=>{
                return <BasicCard key={elem._id} {...elem}/>
            })
        }

    </div>


    
    
    </>
}