import SynagogueIcon from '@mui/icons-material/Synagogue';
import { CategoryGrid } from './CategoryGrid';

const cuisinesList = [
  { name: 'indian', displayName: 'Indian Cuisines', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800' },
  { name: 'mexican', displayName: 'Mexican Cuisines', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800' },
  { name: 'italian', displayName: 'Italian Cuisines', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800' },
  { name: 'chinese', displayName: 'Chinese Cuisines', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800' },
  { name: 'japanese', displayName: 'Japanese Cuisines', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800' },
  { name: 'thai', displayName: 'Thai Cuisines', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800' },
  { name: 'greek', displayName: 'Greek Cuisines', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' },
  { name: 'german', displayName: 'German Cuisines', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800' },
  { name: 'french', displayName: 'French Cuisines', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800' },
  { name: 'spanish', displayName: 'Spanish Cuisines', image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800' },
  { name: 'turkish', displayName: 'Turkish Cuisines', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800' },
  { name: 'american', displayName: 'American Cuisines', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800' }
];

export function Cuisine() {
  const items = cuisinesList.map((c) => ({ path: `/cuisines/${c.name}`, label: c.displayName, img: c.image }));
  return (
    <CategoryGrid
      icon={<SynagogueIcon />}
      title="Cuisines"
      subtitle="Travel the world one dish at a time"
      items={items}
    />
  );
}
