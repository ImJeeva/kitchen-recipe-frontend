


import { useState } from "react";
import { useEffect } from "react";

import { API } from "./global";

import Card from '@mui/material/Card';
import { Counter } from "./Counter";
import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export function German () {
  const navigate=useNavigate()
  const [recipelist, setRecipelist] = useState([]);

const getrecipe=()=>{
  fetch(`${API}/cuisines/data?cuisines=german`)
      .then((val) => val.json())
      .then((list) => setRecipelist(list));
}

  useEffect(() => getrecipe(), []);

  return (
    <div  className='btns'>
       <Button startIcon={<ArrowBackIcon/>}  onClick={()=>navigate(-1)} variant='contained' color='primary'>Back</Button>
    <div>
     <img className="flag" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlsEd5PLtGwpxZyW1Ia7f0RWmhiBXp48tdZQ&usqp=CAU"/>
          <p className="flag1">German Cuisines</p>
        <div className="list">
            {recipelist.map((mv) => (<Germandata key={mv.id} data={mv} />))}
        </div>
    </div>
    </div>
 )};

 function Germandata({data}){
  return (
   
      
    <div className="page">

      <Card className="card">
        <Link to={`/recipedetails/${data._id}`}>
          <img className="img" src={data.image} alt="chiken" />
        </Link>
        <div className="detail">
        <p className="title">{data.cuisines}-cuisine </p>
        <Link className='Link' to={`/recipedetails/${data._id}`}>
          <h3 className="name">{data.title}</h3></Link>
          <div className="count">
            <p className="de">{data.rating}</p>
            <Counter />
          </div>
        </div>
      </Card>
    </div>
   
  );
 }