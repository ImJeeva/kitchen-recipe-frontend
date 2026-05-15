import RestaurantIcon from '@mui/icons-material/Restaurant';

export function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <RestaurantIcon style={{ fontSize: 40, marginBottom: 10 }} />
        <h3>Kitchen Recipe</h3>
        <div className="footer-links">
          <span onClick={() => window.location.href = '/cuisine'}>Cuisines</span>
          <span onClick={() => window.location.href = '/ingredient'}>Ingredients</span>
          <span onClick={() => window.location.href = '/meal'}>Meals</span>
          <span onClick={() => window.location.href = '/about'}>About</span>
        </div>
        <p className="footer-tagline">"Cooking is love made visible" - Discover, Cook, Share!</p>
        <p style={{ marginTop: 20, fontSize: 14 }}>© 2024 Kitchen Recipe. Made with ❤️ for food lovers everywhere.</p>
      </div>
    </div>
  );
}