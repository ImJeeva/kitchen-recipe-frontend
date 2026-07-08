import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { CategoryGrid } from './CategoryGrid';

const mealsList = [
  { slug: 'breakfast', displayName: 'Breakfast Recipes', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800' },
  { slug: 'lunch', displayName: 'Lunch Recipes', image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=800' },
  { slug: 'dinner', displayName: 'Dinner Recipes', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800' },
  { slug: 'desserts', displayName: 'Dessert Recipes', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800' },
  { slug: 'briyani', displayName: 'Biryani Recipes', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800' },
  { slug: 'soup', displayName: 'Soup Recipes', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
  { slug: 'sidedish', displayName: 'Side Dish Recipes', image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800' },
  { slug: 'drinks', displayName: 'Drink Recipes', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800' },
  { slug: 'salads', displayName: 'Salad Recipes', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800' },
  { slug: 'snacks', displayName: 'Snack Recipes', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800' },
];

export function Meal() {
  const items = mealsList.map((m) => ({ path: `/meals/${m.slug}`, label: m.displayName, img: m.image }));
  return (
    <CategoryGrid
      icon={<LunchDiningIcon />}
      title="Meals"
      subtitle="From sunrise breakfasts to late-night dinners"
      items={items}
    />
  );
}
