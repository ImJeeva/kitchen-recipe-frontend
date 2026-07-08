import { useState, useEffect } from "react";
import { API } from "./global";
import Card from '@mui/material/Card';
import { Counter } from "./Counter";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

const cuisineImages = {
  indian: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
  mexican: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
  italian: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
  chinese: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
  japanese: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
  thai: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
  greek: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  german: 'https://images.unsplash.com/photo-1606851091823-d57a35e0c9a5?w=800',
  french: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
  spanish: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800',
  turkish: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800',
  filipino: 'https://images.unsplash.com/photo-1617196034183-33d09fb30882?w=800',
  american: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800'
};

const cuisineDescriptions = {
  indian: 'Rich spices, aromatic curries, and diverse regional flavors from North to South India',
  mexican: 'Bold flavors with corn, beans, and fresh chilies - street food at its finest',
  italian: 'Fresh ingredients, pasta, pizza, and Mediterranean taste perfected over centuries',
  chinese: 'Ancient traditions with stir-fry, dim sum, and perfectly balanced flavors',
  japanese: 'Precision, freshness, and umami-rich dishes from sushi to ramen',
  thai: 'Perfect balance of sweet, sour, salty, and spicy in every bite',
  greek: 'Olive oil, fresh vegetables, and Mediterranean herbs from ancient kitchens',
  german: 'Hearty comfort food with sausages, pretzels, and warm stews',
  french: 'Elegant techniques with butter, wine, and finest sauces',
  spanish: 'Tapas, paella, and vibrant Mediterranean flavors of Spain',
  turkish: 'Kebabs, mezze, and Ottoman-inspired dishes from Istanbul streets',
  filipino: 'Sweet, sour, and savory fusion with unique colonial influences',
  american: 'Diverse melting pot bringing BBQ, burgers, and soul food together'
};

export function CuisinePage({ type: propType }) {
  const { type: paramType } = useParams();
  const [recipelist, setRecipelist] = useState([]);

  const cuisineName = propType || paramType || 'indian';
  const cuisineImage = cuisineImages[cuisineName] || cuisineImages.indian;
  const cuisineDesc = cuisineDescriptions[cuisineName] || cuisineDescriptions.indian;
  const displayName = cuisineName.charAt(0).toUpperCase() + cuisineName.slice(1) + ' Cuisines';

  const getrecipe = () => {
    fetch(`${API}/cuisines/data?cuisines=${cuisineName}`)
      .then((val) => val.json())
      .then((list) => setRecipelist(list));
  };

  useEffect(() => {
    getrecipe();
  }, [cuisineName]);

  const handleImageError = (e) => {
    e.target.src = cuisineImage;
  };

  return (
    <div className="detail-page">
      <div className="cuisine-header">
        <img className="cuisine-hero" src={cuisineImage} alt={cuisineName} onError={handleImageError} />
        <div className="cuisine-overlay">
          <h1 className="cuisine-title">{displayName}</h1>
          <p className="cuisine-desc">{cuisineDesc}</p>
          <p className="cuisine-count">{recipelist.length} Recipes</p>
        </div>
      </div>

      <div className="recipe-grid">
        {recipelist.length === 0 ? (
          <div className="no-results">
            <p>No recipes found for this cuisine</p>
            <p>Be the first to add a {cuisineName} recipe!</p>
          </div>
        ) : (
          recipelist.map((mv) => <CuisineData key={mv._id} data={mv} />)
        )}
      </div>
    </div>
  );
}

function CuisineData({ data }) {
  const handleImageError = (e) => {
    e.target.src = "https://img.freepik.com/free-photo/vegetable-salad-with-lettuce-spinach-kale-arugula_1339-144456.jpg";
  };

  return (
    <Card className="recipe-card" elevation={0}>
      <Link to={`/recipedetails/${data._id}`} className="recipe-card-media">
        <img src={data.image} alt={data.title} loading="lazy" onError={handleImageError} />
        {data.cuisines && <span className="recipe-card-tag">{data.cuisines}</span>}
      </Link>
      <div className="recipe-card-body">
        <Link className="recipe-card-title-link" to={`/recipedetails/${data._id}`}>
          <h3>{data.title}</h3>
        </Link>
        <p className="recipe-card-desc">{data.discription?.substring(0, 60)}...</p>
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

export function Indian() {
  return <CuisinePage type="indian" />;
}
export function Mexican() {
  return <CuisinePage type="mexican" />;
}
export function Italian() {
  return <CuisinePage type="italian" />;
}
export function Chinese() {
  return <CuisinePage type="chinese" />;
}
export function Japanese() {
  return <CuisinePage type="japanese" />;
}
export function Greek() {
  return <CuisinePage type="greek" />;
}
export function German() {
  return <CuisinePage type="german" />;
}
export function Spanish() {
  return <CuisinePage type="spanish" />;
}
export function Turkish() {
  return <CuisinePage type="turkish" />;
}
export function Filipino() {
  return <CuisinePage type="filipino" />;
}
export function French() {
  return <CuisinePage type="french" />;
}
export function American() {
  return <CuisinePage type="american" />;
}
export function Thai() {
  return <CuisinePage type="thai" />;
}