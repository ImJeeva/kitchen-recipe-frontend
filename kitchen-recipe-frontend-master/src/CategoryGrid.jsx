import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function CategoryGrid({ icon, title, subtitle, items }) {
  return (
    <div className="listing-page">
      <div className="listing-hero">
        <div className="listing-hero-icon">{icon}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <span className="listing-count">{items.length} to explore</span>
      </div>
      <div className="reveal-grid listing-grid">
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
    </div>
  );
}
