import { GETDATA } from "./actionTypes";


let initstate={
    data:[]
}

export const reducer=(state=initstate,{type,payload})=>{
    if(type===GETDATA){
        return {
            ...state,
            data:[...payload]
        }
    }
    else{
        return state
    }
}