import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import { CategoryGrid } from './CategoryGrid';

const ingredientsList = [
  { slug: 'chicken', displayName: 'Chicken Recipes', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800' },
  { slug: 'cheese', displayName: 'Cheese Recipes', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800' },
  { slug: 'vegitable', displayName: 'Vegetable Recipes', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800' },
  { slug: 'choco', displayName: 'Chocolate Recipes', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800' },
  { slug: 'beef', displayName: 'Beef Recipes', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800' },
  { slug: 'fish', displayName: 'Fish Recipes', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800' },
  { slug: 'mutton', displayName: 'Mutton Recipes', image: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=800' },
  { slug: 'seafood', displayName: 'Seafood Recipes', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800' },
  { slug: 'pasta', displayName: 'Pasta Recipes', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800' },
  { slug: 'egg', displayName: 'Egg Recipes', image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=800' },
];

export function Ingredient() {
  const items = ingredientsList.map((i) => ({ path: `/ingredients/${i.slug}`, label: i.displayName, img: i.image }));
  return (
    <CategoryGrid
      icon={<BakeryDiningIcon />}
      title="Ingredients"
      subtitle="Find recipes built around what you already have"
      items={items}
    />
  );
}
