import * as React from 'react';

// export function Reset() {
//   return (
//     <div>

//     </div>
//   );
// }

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import {API} from "./global";



export function Reset() {
const navigate=useNavigate()

  const params = new URLSearchParams(window.location.search);
  console.log(params.get("id"))
  console.log(params.get("token"))


  const {values,handleChange,handleSubmit}=useFormik({
    initialValues:{
     password:"",
     
    },
    onSubmit:async (value)=>{
      console.log(value)
     const data= await fetch(`${API}/reset/${params.get("id")}/${params.get("token")}`,{
     method:"POST",
     headers: {"Content-type": "application/json",},
     body:JSON.stringify(value)
 })
const result=await data.json()
// alert(result.status)
console.log(result)
navigate("/login")
},

  })
 
  return (
    
 <form onSubmit={handleSubmit}>
  <div className='signup'>
    <h1>Reset Here</h1>
  
  <TextField onChange={handleChange} value={values.password} name="password" label="password" variant="outlined"/>
  <Button onClick={()=>alert('🎉your password was reset successfully🎉')} type="submit" variant="contained">submit</Button>
  </div>
 </form>
 
  );
}