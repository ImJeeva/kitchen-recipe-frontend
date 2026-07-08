import { Link } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Logo() {
  return (
    <Link to="/" className="brand-logo" style={{ color: 'inherit', textDecoration: 'none' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#fff' }}>
        <RestaurantMenuIcon fontSize="large" />
        <Typography
          variant="h6"
          component="span"
          sx={{ fontWeight: 700, letterSpacing: 0.5, color: '#fff', display: { xs: 'none', sm: 'inline' } }}
        >
          Kitchen Recipe
        </Typography>
      </Box>
    </Link>
  );
}
