import { useState, useEffect } from "react";
import { API } from "./global";
import Card from '@mui/material/Card';
import { Counter } from "./Counter";
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

function MealItem({ data }) {
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

export function MealPage({ meal, endpoint, img, title }) {
  const [recipelist, setRecipelist] = useState([]);

  useEffect(() => {
    const url = endpoint ? `${API}${endpoint}` : `${API}/meals/data?meals=${meal}`;
    fetch(url)
      .then((val) => val.json())
      .then((list) => setRecipelist(Array.isArray(list) ? list : []))
      .catch(() => setRecipelist([]));
  }, [meal, endpoint]);

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
          recipelist.map((mv) => <MealItem key={mv._id} data={mv} />)
        )}
      </div>
    </div>
  );
}
