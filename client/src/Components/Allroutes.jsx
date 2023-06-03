import {Routes, Route} from "react-router-dom"
import App from "../App"
import Home from "../Pages/home"
import Form from "../Pages/form"
import Edit from "../Pages/edit"

export default function Allroutes(){
    return <>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/create" element={<Form/>}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
    </Routes>
    </>
}