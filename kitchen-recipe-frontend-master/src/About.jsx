import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

export function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <EmojiFoodBeverageIcon className="about-hero-icon" />
        <h1 className="about-title">Welcome to Kitchen Recipe</h1>
        <p className="about-subtitle">Your Ultimate Culinary Companion</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="about-icon">
            <RestaurantIcon />
          </div>
          <h2>Discover Recipes</h2>
          <p>Explore thousands of delicious recipes from cuisines around the world. From Indian biryanis to Italian pasta, Mexican tacos to Japanese sushi - we've got it all!</p>
        </section>

        <section className="about-section">
          <div className="about-icon">
            <SearchIcon />
          </div>
          <h2>Easy Search</h2>
          <p>Find the perfect dish by cuisine, ingredients, or meal type. Our smart filters help you discover recipes that match your taste and available ingredients.</p>
        </section>

        <section className="about-section">
          <div className="about-icon">
            <FavoriteIcon />
          </div>
          <h2>Save Your Favorites</h2>
          <p>Create your personal collection of favorite recipes. Add your own recipes and share your culinary creations with the community.</p>
        </section>

        <section className="about-section">
          <div className="about-icon">
            <PublicIcon />
          </div>
          <h2>Global Cuisines</h2>
          <p>Travel the world through food! Discover authentic recipes from Indian, Mexican, Italian, Chinese, Japanese, Thai, Greek, German, French, Spanish, Turkish, Filipino, and American cuisines.</p>
        </section>
      </div>

      <div className="about-features">
        <h2>What Makes Us Special</h2>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-number">500+</span>
            <span className="feature-label">Recipes</span>
          </div>
          <div className="feature-item">
            <span className="feature-number">13</span>
            <span className="feature-label">Cuisines</span>
          </div>
          <div className="feature-item">
            <span className="feature-number">100%</span>
            <span className="feature-label">Free</span>
          </div>
          <div className="feature-item">
            <span className="feature-number">24/7</span>
            <span className="feature-label">Access</span>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <h2>Ready to Cook?</h2>
        <p>Join our community of food lovers and start exploring delicious recipes today!</p>
        <Link to="/signup">
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}