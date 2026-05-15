import * as React from 'react';

// export function Forgot() {
//   return (
//     <div>
//       helo
//     </div>
//   );
// }


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import {API} from "./global";

export function Forgot() {

  
  const {handleSubmit,values,handleChange}=useFormik({
    initialValues:{
      
      email:"",
    },
    onSubmit:async (value)=>{
      console.log(value)
     const data= await fetch(`${API}/forgot`,{
     method:"POST",
     headers: {"Content-type": "application/json",},
     body:JSON.stringify(value)
 })
const result=await data.json()
alert(result.status)
console.log(result)
},
})
    

   

  return (
    <form onSubmit={handleSubmit}>
    <div className='login'>
  
    <TextField name="email" value={values.email} onChange={handleChange} label="email place here" variant="outlined"/>
    <Button  variant='contained' color="success" type="submit">submit</Button>
      
    </div>

    </form>
  );
}