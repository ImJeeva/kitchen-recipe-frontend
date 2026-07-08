import { Link, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

const SECTION_LABELS = {
  cuisine: 'Cuisines',
  cuisines: 'Cuisines',
  ingredient: 'Ingredients',
  ingredients: 'Ingredients',
  meal: 'Meals',
  meals: 'Meals',
  quantity: 'Quantity',
  quick: 'Instant Recipes',
  rated: 'High Rated Recipes',
  highquantity: 'High Servings',
  lowquantity: 'Low Servings',
  allrecipe: 'All Recipes',
  addrecipe: 'Add Recipe',
  recipedetails: 'Recipe Details',
  signup: 'Sign Up',
  login: 'Login',
  forgot: 'Forgot Password',
  reset: 'Reset Password',
  about: 'About Us',
  data: null,
};

const SECTION_LINK = {
  cuisine: '/cuisine',
  cuisines: '/cuisine',
  ingredient: '/ingredient',
  ingredients: '/ingredient',
  meal: '/meal',
  meals: '/meal',
};

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isIdLike(seg) {
  return /^[0-9a-fA-F]{20,}$/.test(seg);
}

export function Breadcrumbs() {
  const location = useLocation();

  if (location.pathname === '/') return null;

  const segments = location.pathname.split('/').filter(Boolean);
  const crumbs = [];

  segments.forEach((seg, i) => {
    if (isIdLike(seg)) return;
    const hasLabel = seg in SECTION_LABELS;
    if (hasLabel && SECTION_LABELS[seg] === null) return;
    const label = hasLabel ? SECTION_LABELS[seg] : titleCase(seg);
    const path = SECTION_LINK[seg] || '/' + segments.slice(0, i + 1).join('/');
    crumbs.push({ label, path });
  });

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <Link to="/" className="breadcrumb-link">
        <HomeIcon fontSize="inherit" /> Home
      </Link>
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span className="breadcrumb-item" key={c.path + i}>
            <NavigateNextIcon fontSize="inherit" className="breadcrumb-sep" />
            {isLast ? (
              <span className="breadcrumb-current">{c.label}</span>
            ) : (
              <Link to={c.path} className="breadcrumb-link">{c.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
