
import { useState } from "react";
import { useEffect } from "react";

import { API } from "./global";

import Card from '@mui/material/Card';
import { Counter } from "./Counter";
import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export function High () {
  const navigate=useNavigate()
  const [recipelist, setRecipelist] = useState([]);

const getrecipe=()=>{
  fetch(`${API}/highservings/data`)
      .then((val) => val.json())
      .then((list) => setRecipelist(list));
}

  useEffect(() => getrecipe(), []);

  return (
    <div  className='btns'>
       <Button startIcon={<ArrowBackIcon/>}  onClick={()=>navigate(-1)} variant='contained' color='primary'>Back</Button>
    <div>
   <img className="dish" src="https://noexcuseseasyorganising.com/wp-content/uploads/2011/09/breville-bol-1024x770.jpg"/>
          <p className="flag1">High Quantity Recipes</p>
        <div className="list">
            {recipelist.map((mv) => (<Highdata key={mv.id} data={mv} />))}
        </div>
    </div>
    </div>
 )};

 function Highdata({data}){
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