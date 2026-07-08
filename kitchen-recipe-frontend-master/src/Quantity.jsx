import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { CategoryGrid } from './CategoryGrid';

const items = [
  { path: '/highquantity/data', label: 'High Quantity Recipes', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800' },
  { path: '/lowquantity/data', label: 'Low Quantity Recipes', img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800' },
];

export function Quantity() {
  return (
    <CategoryGrid
      icon={<RestaurantMenuIcon />}
      title="Quantity"
      subtitle="Cooking for one or feeding a crowd"
      items={items}
    />
  );
}
