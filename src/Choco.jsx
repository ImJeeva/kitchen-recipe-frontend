


import { useState } from "react";
import { useEffect } from "react";

import { API } from "./global";

import Card from '@mui/material/Card';
import { Counter } from "./Counter";
import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export function Choco () {
  const navigate=useNavigate()
  const [recipelist, setRecipelist] = useState([]);

const getrecipe=()=>{
  fetch(`${API}/ingredients/data?main_content=choco`)
      .then((val) => val.json())
      .then((list) => setRecipelist(list));
}

  useEffect(() => getrecipe(), []);

  return (
    <div  className='btns'>
       <Button startIcon={<ArrowBackIcon/>}  onClick={()=>navigate(-1)} variant='contained' color='primary'>Back</Button>
    <div>
   <img className="dish" src="https://media.istockphoto.com/id/1255426185/photo/delicious-chocolate-zucchini-brownies.jpg?b=1&s=170667a&w=0&k=20&c=WZajVWSpzMGwJAOw9bbS5n00N9_28pI83SOrCVMWpkY="/>
          <p className="flag1">Choco Recipes</p>
        <div className="list">
            {recipelist.map((mv) => (<Chocodata key={mv.id} data={mv} />))}
        </div>
    </div>
    </div>
 )};

 function Chocodata({data}){
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