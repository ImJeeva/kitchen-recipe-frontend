import * as React from 'react';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';

const cuisinesList = [
  {
    name: 'indian',
    displayName: 'Indian Cuisines',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800'
  },
  {
    name: 'mexican',
    displayName: 'Mexican Cuisines',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800'
  },
  {
    name: 'italian',
    displayName: 'Italian Cuisines',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800'
  },
  {
    name: 'chinese',
    displayName: 'Chinese Cuisines',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800'
  },
  {
    name: 'japanese',
    displayName: 'Japanese Cuisines',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800'
  },
  {
    name: 'thai',
    displayName: 'Thai Cuisines',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800'
  },
  {
    name: 'greek',
    displayName: 'Greek Cuisines',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800'
  },
  {
    name: 'german',
    displayName: 'German Cuisines',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800'
  },
  {
    name: 'french',
    displayName: 'French Cuisines',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800'
  },
  {
    name: 'spanish',
    displayName: 'Spanish Cuisines',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800'
  },
  {
    name: 'turkish',
    displayName: 'Turkish Cuisines',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800'
  },
  {
    name: 'american',
    displayName: 'American Cuisines',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800'
  }
];

export function Cuisine() {
  return (
    <div>
      <h1 className='side'>CUISINES</h1>
      <div className='cuisines'>
        {cuisinesList.map((cuisine) => (
          <div key={cuisine.name}>
            <Card className="card">
              <Link to={`/cuisines/${cuisine.name}`}>
                <img className="img" src={cuisine.image} alt={cuisine.name} />
              </Link>
              <div className="detail">
                <Link className='Link' to={`/cuisines/${cuisine.name}`}>
                  <h3 className="name1">{cuisine.displayName}</h3>
                </Link>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}