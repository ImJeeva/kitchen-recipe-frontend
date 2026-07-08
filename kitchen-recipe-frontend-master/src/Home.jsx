import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import PublicIcon from '@mui/icons-material/Public';
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useStateValue } from './StateProvider';

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function displayNameFromUsername(username) {
  if (!username) return '';
  const namePart = username.replace(/[._]/g, ' ');
  return namePart.replace(/\b\w/g, (c) => c.toUpperCase());
}

const cuisinePreviews = [
  { path: '/cuisines/indian', label: 'Indian Cuisines', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800' },
  { path: '/cuisines/german', label: 'German Cuisines', img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800' },
  { path: '/cuisines/greek', label: 'Greek Cuisines', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' },
];

const ingredientPreviews = [
  { path: '/ingredients/chicken', label: 'Chicken Recipes', img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800' },
  { path: '/ingredients/cheese', label: 'Cheese Recipes', img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800' },
  { path: '/ingredients/vegitable', label: 'Vegetable Recipes', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800' },
];

const mealPreviews = [
  { path: '/meals/breakfast', label: 'Breakfast Recipes', img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800' },
  { path: '/meals/lunch', label: 'Lunch Recipes', img: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=800' },
  { path: '/meals/dinner', label: 'Dinner Recipes', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800' },
];

const stats = [
  { icon: <PublicIcon />, value: '12+', label: 'Cuisines', path: '/cuisine' },
  { icon: <KitchenIcon />, value: '10+', label: 'Ingredients', path: '/ingredient' },
  { icon: <RestaurantIcon />, value: '20+', label: 'Meal Types', path: '/meal' },
];

function PreviewSection({ title, subtitle, seeAllPath, items }) {
  return (
    <Box component="section" className="section">
      <div className="section-head">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <Link className="see-all" to={seeAllPath}>
          See all <ArrowForwardIcon fontSize="small" />
        </Link>
      </div>
      <div className="reveal-grid">
        {items.map(({ path, label, img }) => (
          <Card className="reveal-card" key={path} elevation={0}>
            <Link to={path} className="reveal-card-link">
              <div className="reveal-card-media">
                <img src={img} alt={label} loading="lazy" />
              </div>
              <div className="reveal-card-body">
                <h3>{label}</h3>
                <span className="reveal-card-cta">Explore <ArrowForwardIcon fontSize="inherit" /></span>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </Box>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [{ user }] = useStateValue();
  const displayName = displayNameFromUsername(user);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', pb: 8 }}>
      <div className="hero-banner">
        <img
          className="hero-banner-img"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
          alt="Delicious food spread"
        />
        <div className="hero-banner-overlay" />
        <div className="hero-banner-content">
          {displayName ? (
            <>
              <span className="hero-eyebrow">👋 {getTimeGreeting()}</span>
              <h1>Hi <span className="hero-highlight">{displayName}</span>, ready to cook?</h1>
              <p>Your next favorite recipe is one click away. Browse fresh ideas or share a dish of your own with the community.</p>
              <div className="hero-actions">
                <Button className="hero-btn-primary" variant="contained" onClick={() => navigate('/allrecipe')}>
                  Browse Recipes
                </Button>
                <Button className="hero-btn-secondary" variant="outlined" onClick={() => navigate('/addrecipe')}>
                  Add a Recipe
                </Button>
              </div>
            </>
          ) : (
            <>
              <span className="hero-eyebrow">Welcome to Kitchen Recipe</span>
              <h1>Cook Something <span className="hero-highlight">Extraordinary</span> Today</h1>
              <p>Explore recipes from every corner of the world — by cuisine, ingredient, or meal — and share your own with a growing community of home cooks.</p>
              <div className="hero-actions">
                <Button className="hero-btn-primary" variant="contained" onClick={() => navigate('/signup')}>
                  Get Started
                </Button>
                <Button className="hero-btn-secondary" variant="outlined" onClick={() => navigate('/cuisine')}>
                  Explore Recipes
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="stats-strip">
        {stats.map((s) => (
          <div className="stat-item" key={s.label} onClick={() => navigate(s.path)} role="button" tabIndex={0}>
            <span className="stat-icon">{s.icon}</span>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <PreviewSection
        title="Cuisines"
        subtitle="Travel the world one dish at a time"
        seeAllPath="/cuisine"
        items={cuisinePreviews}
      />
      <PreviewSection
        title="Ingredients"
        subtitle="Find recipes built around what you already have"
        seeAllPath="/ingredient"
        items={ingredientPreviews}
      />
      <PreviewSection
        title="Meals"
        subtitle="From sunrise breakfasts to late-night dinners"
        seeAllPath="/meal"
        items={mealPreviews}
      />
    </Box>
  );
}
