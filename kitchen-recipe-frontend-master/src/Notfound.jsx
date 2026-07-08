import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <RestaurantMenuIcon className="notfound-icon" />
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Recipe Not Found</h2>
      <p className="notfound-desc">The page you're looking for isn't on the menu. Let's get you back to something delicious.</p>
      <Button className="hero-btn-primary" variant="contained" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </div>
  );
}
