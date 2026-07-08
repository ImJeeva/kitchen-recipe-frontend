import Card from '@mui/material/Card';
import { Counter } from "./Counter";
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

export function Recipe({ data }) {
  const handleImageError = (e) => {
    e.target.src = "https://img.freepik.com/free-photo/vegetable-salad-with-lettuce-spinach-kale-arugula_1339-144456.jpg";
  };

  return (
    <Card className="recipe-card" elevation={0}>
      <Link to={`/recipedetails/${data._id}`} className="recipe-card-media">
        <img
          src={data.image}
          alt={data.title}
          onError={handleImageError}
          loading="lazy"
        />
        {data.cuisines && <span className="recipe-card-tag">{data.cuisines}</span>}
      </Link>
      <div className="recipe-card-body">
        <Link className="recipe-card-title-link" to={`/recipedetails/${data._id}`}>
          <h3>{data.title}</h3>
        </Link>
        <p className="recipe-card-desc">{data.discription?.substring(0, 60)}...</p>
        <div className="recipe-card-meta">
          <span><AccessTimeIcon fontSize="inherit" /> {data.cookingtime}</span>
          <span><PeopleIcon fontSize="inherit" /> {data.servings} servings</span>
        </div>
        <div className="recipe-card-footer">
          <span className="recipe-card-rating">{data.rating}</span>
          <Counter />
        </div>
      </div>
    </Card>
  );
}
