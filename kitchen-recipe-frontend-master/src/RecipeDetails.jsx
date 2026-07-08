import { useNavigate, useParams } from 'react-router-dom';
import { API } from "./global";
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from './App';
import { Counter } from './Counter';

export function RecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isFetching, data: recipe } = useQuery(
    ["recipes", id],
    async () => await fetch(`${API}/${id}`).then((data) => data.json()),
    {
      staleTime: 10000,
      initialData: queryClient.getQueryData(["recipes"])?.find((mv) => mv._id === id),
    }
  );

  const handleImageError = (e) => {
    e.target.src = "https://img.freepik.com/free-photo/vegetable-salad-with-lettuce-spinach-kale-arugula_1339-144456.jpg";
  };

  if (isFetching && !recipe) {
    return (
      <div className="recipe-detail-loading">
        <div className="recipe-skeleton-card" style={{ height: 420 }} />
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <div className="recipe-detail-hero">
        <img
          src={recipe?.image}
          alt={recipe?.title}
          onError={handleImageError}
          loading="lazy"
        />
        {recipe?.cuisines && <span className="recipe-detail-tag">{recipe.cuisines}</span>}
      </div>

      <div className="recipe-detail-body">
        <h1 className="recipe-detail-title">{recipe?.title}</h1>

        <div className="recipe-detail-meta">
          <span><AccessTimeIcon fontSize="inherit" /> {recipe?.cookingtime}</span>
          <span><PeopleIcon fontSize="inherit" /> {recipe?.servings} servings</span>
          {recipe?.meals && <span><RestaurantIcon fontSize="inherit" /> {recipe.meals}</span>}
          <span className="recipe-detail-rating">{recipe?.rating}</span>
        </div>

        <div className="recipe-detail-actions">
          <Counter />
        </div>

        {recipe?.video && (
          <div className="recipe-detail-video">
            <iframe
              width="100%"
              height="420"
              src={recipe.video}
              title={recipe.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}

        <section className="recipe-detail-section">
          <h2>What Makes It Special</h2>
          <p className="recipe-detail-desc">{recipe?.discription}</p>
        </section>

        {recipe?.ingredients?.length > 0 && (
          <section className="recipe-detail-section">
            <h2>Ingredients</h2>
            <ul className="recipe-detail-ingredients">
              {recipe.ingredients.map((sub, index) => (
                <li key={index}>{sub}</li>
              ))}
            </ul>
          </section>
        )}

        {recipe?.directions?.length > 0 && (
          <section className="recipe-detail-section">
            <h2>Directions</h2>
            <ol className="recipe-detail-steps">
              {recipe.directions.map((sub, index) => (
                <li key={index}>
                  <span className="recipe-detail-step-number">{index + 1}</span>
                  <span>{sub}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {recipe?.note && (
          <div className="recipe-detail-note">
            <strong>Cook's Notes:</strong> {recipe.note}
          </div>
        )}

        <Button
          className="recipe-detail-cta"
          onClick={() => navigate('/allrecipe')}
          variant="contained"
        >
          Explore More Recipes
        </Button>
      </div>
    </div>
  );
}
