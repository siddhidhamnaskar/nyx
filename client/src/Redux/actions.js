

import { GETDATA } from "./actionTypes";


export const getData=(payload)=>{
    return {
        type:GETDATA,
        payload
    }

}
