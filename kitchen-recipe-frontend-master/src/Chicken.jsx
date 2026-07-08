import { useState, useEffect } from "react";
import { API } from "./global";
import Card from '@mui/material/Card';
import { Counter } from "./Counter";
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

const ingredients = [
  { name: 'chicken', img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200', title: 'Chicken Recipes', key: 'chicken' },
  { name: 'cheese', img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=1200', title: 'Cheese Recipes', key: 'cheese' },
  { name: 'vegitable', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200', title: 'Vegetable Recipes', key: 'vegitable' },
  { name: 'choco', img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200', title: 'Chocolate Recipes', key: 'choco' },
  { name: 'fish', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200', title: 'Fish Recipes', key: 'fish' },
  { name: 'mutton', img: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=1200', title: 'Mutton Recipes', key: 'mutton' },
  { name: 'seafood', img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=1200', title: 'Seafood Recipes', key: 'seafood' },
  { name: 'pasta', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=1200', title: 'Pasta Recipes', key: 'pasta' },
  { name: 'egg', img: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=1200', title: 'Egg Recipes', key: 'egg' },
  { name: 'beef', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200', title: 'Beef Recipes', key: 'beef' },
];

function IngredientItem({ data }) {
  return (
    <Card className="recipe-card" elevation={0}>
      <Link to={`/recipedetails/${data._id}`} className="recipe-card-media">
        <img src={data.image} alt={data.title} loading="lazy" />
        {data.cuisines && <span className="recipe-card-tag">{data.cuisines}</span>}
      </Link>
      <div className="recipe-card-body">
        <Link className="recipe-card-title-link" to={`/recipedetails/${data._id}`}>
          <h3>{data.title}</h3>
        </Link>
        <div className="recipe-card-meta">
          {data.cookingtime && <span><AccessTimeIcon fontSize="inherit" /> {data.cookingtime}</span>}
          {data.servings && <span><PeopleIcon fontSize="inherit" /> {data.servings} servings</span>}
        </div>
        <div className="recipe-card-footer">
          <span className="recipe-card-rating">{data.rating}</span>
          <Counter />
        </div>
      </div>
    </Card>
  );
}

function IngredientPage({ name, img, title }) {
  const [recipelist, setRecipelist] = useState([]);

  useEffect(() => {
    fetch(`${API}/ingredients/data?ingredient=${name}`)
      .then((val) => val.json())
      .then((list) => {
        if (Array.isArray(list)) setRecipelist(list);
        else setRecipelist([]);
      })
      .catch(() => setRecipelist([]));
  }, [name]);

  return (
    <div className="detail-page">
      <div className="detail-hero">
        <img src={img} alt={title} />
        <div className="detail-hero-overlay">
          <span className="detail-hero-count">{recipelist.length} recipes</span>
          <h1 className="detail-hero-title">{title}</h1>
        </div>
      </div>
      <div className="recipe-grid">
        {recipelist.length === 0 ? (
          <div className="no-results">
            <p>No recipes found yet</p>
            <p>Be the first to add one!</p>
          </div>
        ) : (
          recipelist.map((mv) => <IngredientItem key={mv._id} data={mv} />)
        )}
      </div>
    </div>
  );
}

export function Chicken() { return <IngredientPage {...ingredients[0]} />; }
export function Cheese() { return <IngredientPage {...ingredients[1]} />; }
export function Vegitable() { return <IngredientPage {...ingredients[2]} />; }
export function Choco() { return <IngredientPage {...ingredients[3]} />; }
export function Fish() { return <IngredientPage {...ingredients[4]} />; }
export function Mutton() { return <IngredientPage {...ingredients[5]} />; }
export function Seafood() { return <IngredientPage {...ingredients[6]} />; }
export function Pasta() { return <IngredientPage {...ingredients[7]} />; }
export function Egg() { return <IngredientPage {...ingredients[8]} />; }
export function Beef() { return <IngredientPage {...ingredients[9]} />; }