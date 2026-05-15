

import * as React from 'react';

import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
export function Quantity() {
 
  return (
      <div>
      <h1 className='side'>QUANTITY</h1>
    <div className='cuisines'>
      <div>
      <Card className="card">
            <Link to={`/highquantity/data`}>
                    <img className="img" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201509/food-large-story_647_091515040544.jpg?VersionId=9VmSmN63hlYdQAaf5zQCHGI9rH.uPAHj" alt="high" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/highquantity/data`}>
                    <h3 className="name1">High Quantity Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/lowquantity/data`}>
                    <img className="img" src="https://thumbs.dreamstime.com/b/small-amount-food-white-plate-measuring-tape-diet-concept-healthy-round-112087342.jpg" alt="low" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/lowquantity/data`}>
                    <h3 className="name1">Low Quantity Recipes</h3></Link>
      </div>
      </Card>
      </div>

     </div>
     </div>
  );
}
