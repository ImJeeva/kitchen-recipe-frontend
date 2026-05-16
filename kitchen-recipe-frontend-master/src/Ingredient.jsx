
import * as React from 'react';

import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
export function Ingredient() {
 
  return (
      <div>
      <h1 className='side'>INGREDIENTS</h1>
    <div className='cuisines'>
      <div>
      <Card className="card">
            <Link to={`/ingredients/chicken`}>
                    <img className="img" src="https://hips.hearstapps.com/hmg-prod/images/766/healthy-chicken-cooking-1508878141.jpg" alt="chicken" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/chicken`}>
                    <h3 className="name1">Chicken Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/ingredients/cheese`}>
                    <img className="img" src="https://images-prod.healthline.com/hlcmsresource/images/AN_images/healthiest-cheese-1296x728-swiss.jpg" alt="cheese" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/cheese`}>
                    <h3 className="name1">Cheese Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/ingredients/vegitable`}>
                    <img className="img" src="https://www.simplyrecipes.com/thmb/YrDbtJD7UObEMjOLiV6gJt6yt2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Oven-Roasted-Vegetables-LEAD-8-58102e6b825944c68aee7565401974f2.jpg" alt="vegitable" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/vegitable`}>
                    <h3 className="name1">vegitable Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/ingredients/choco`}>
                    <img className="img" src="https://thumbs.dreamstime.com/b/chocolate-pralines-17718234.jpg" alt="choco" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/choco`}>
                    <h3 className="name1">choco Recipes</h3></Link>
      </div>
      </Card>
      </div>   <div>
      <Card className="card">
            <Link to={`/ingredients/beef`}>
                    <img className="img" src="https://heygrillhey.com/static/438175c311213c52e1c8f12e08483f9d/Beef-Ribs-Feature.png" alt="
                    beef" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/beef`}>
                    <h3 className="name1">beef Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/ingredients/fish`}>
                    <img className="img" src="https://www.storynory.com/wp-content/uploads/2022/09/ungoldenfish-videoart.jpg" alt="fish" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/fish`}>
                    <h3 className="name1">fish Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/ingredients/mutton`}>
                    <img className="img" src="https://media.istockphoto.com/id/465150864/photo/five-roaster-lamb-ribs-with-herbs.jpg?s=612x612&w=0&k=20&c=T_-CmiZ_GTLHf7NUsRAUdR_IZCXMWrZlg-zzU7cEU7I=" alt="mutton" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/mutton`}>
                    <h3 className="name1">mutton Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/ingredients/seafood`}>
                    <img className="img" src="https://media.istockphoto.com/id/1305699663/photo/seafood-platter-grilled-lobster-shrimps-scallops-langoustines-octopus-squid-on-white-plate.jpg?b=1&s=170667a&w=0&k=20&c=YB2j-E3mX8ZLFp8BLLquyF5N6v4mu_SQ1-9iGHBkulM=" alt="seafood" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/seafood`}>
                    <h3 className="name1">seafood Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/ingredients/pasta`}>
                    <img className="img" src="https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg" alt="
                    pasta" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/pasta`}>
                    <h3 className="name1">pasta Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/ingredients/egg`}>
                    <img className="img" src="https://c.ndtvimg.com/2022-05/pl007fjo_egg-curry_625x300_04_May_22.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350" alt="egg" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/egg`}>
                    <h3 className="name1">egg Recipes</h3></Link>
      </div>
      </Card>
      </div>
     </div>
     </div>
  );
}
