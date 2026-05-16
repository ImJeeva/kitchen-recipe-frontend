import Card from '@mui/material/Card';
import { Counter } from "./Counter";
import { Link } from 'react-router-dom';

export function Recipe({ data }) {
  const handleImageError = (e) => {
    e.target.src = "https://img.freepik.com/free-photo/vegetable-salad-with-lettuce-spinach-kale-arugula_1339-144456.jpg";
  };

  return (
    <div>
      <Card className="card">
        <Link to={`/recipedetails/${data._id}`}>
          <img 
            className="img" 
            src={data.image} 
            alt={data.title}
            onError={handleImageError}
            loading="lazy"
          />
        </Link>
        <div className="detail">
          <p className="title">{data.cuisines} cuisine</p>
          <Link className='Link' to={`/recipedetails/${data._id}`}>
            <h3 className="name">{data.title}</h3>
          </Link>
          <p className="de">{data.discription?.substring(0, 60)}...</p>
          <div className="recipe-meta">
            <span className="meta-item">⏱ {data.cookingtime}</span>
            <span className="meta-item">👥 {data.servings} servings</span>
          </div>
          <div className="count">
            <p className="de">{data.rating}</p>
            <Counter />
          </div>
        </div>
      </Card>
    </div>
  );
}
