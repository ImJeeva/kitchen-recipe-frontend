import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export function Home() {
  const navigate=useNavigate()
  return (
    <div>
      <div>
     <img className='homesrc' src="https://bloggerspassion.com/wp-content/uploads/2019/12/best-food-blogs-to-follow.jpg"/>
   <div className='homebtn'>
<Button className='hbtns' variant='contained' color="primary" onClick={()=>navigate("/signup")}>signup</Button>
   </div>
   </div>
   <div className='target'>   <Link className='ang1' to={`/cuisine`}> <h1 className='homename'>cuisines</h1>  </Link></div>
   <div className='homecard'>
   
      <Card className="card">
            <Link to={`/cuisines/indian`}>
                    <img className="img" src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=" alt="indian" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/cuisines/indian`}>
                    <h3 className="name1">Indian Cuisines</h3></Link>
      </div>
      </Card>
      
      <Card className="card">
            <Link to={`/cuisines/german`}>
                    <img className="img" src="https://listaka.com/wp-content/uploads/2017/04/castles.jpg" alt="indian" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/cuisines/german`}>
                    <h3 className="name1">German Cuisines</h3></Link>
      </div>
      </Card>
     
      <Card className="card">
            <Link to={`/cuisines/greek`}>
                    <img className="img" src="https://www.davestravelpages.com/wp-content/uploads/2019/08/parthenon-in-greece-1024x576.jpg" alt="indian" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/cuisines/greek`}>
                    <h3 className="name1">Greek Cuisines</h3></Link>
      </div>
      </Card>
      </div>
      <div><Link className='ang1' to={`/ingredient`}> <h1 className='homename'>ingredients</h1>  </Link> </div>
   <div className='homecard'>
   
      <Card className="card">
            <Link to={`/ingredients/chicken`}>
                    <img className="img" src="https://hips.hearstapps.com/hmg-prod/images/766/healthy-chicken-cooking-1508878141.jpg" alt="indian" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/chicken`}>
                    <h3 className="name1">chicken recipe</h3></Link>
      </div>
      </Card>
      
      <Card className="card">
            <Link to={`/ingredients/cheese`}>
                    <img className="img" src="https://images-prod.healthline.com/hlcmsresource/images/AN_images/healthiest-cheese-1296x728-swiss.jpg" alt="indian" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/cheese`}>
                    <h3 className="name1">cheese recipe</h3></Link>
      </div>
      </Card>
     
      <Card className="card">
            <Link to={`/ingredients/vegitable`}>
                    <img className="img" src="https://www.simplyrecipes.com/thmb/YrDbtJD7UObEMjOLiV6gJt6yt2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Oven-Roasted-Vegetables-LEAD-8-58102e6b825944c68aee7565401974f2.jpg" alt="indian" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/ingredients/vegitable`}>
                    <h3 className="name1">veg recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div> <Link className='ang1' to={`/meal`}> <h1 className='homename'>meals</h1>  </Link> </div>
   <div className='homecard'>
   
      <Card className="card">
            <Link to={`/meals/breakfast`}>
                    <img className="img" src="https://thumbs.dreamstime.com/z/south-indian-breakfast-idli-dosa-chutney-indian-breakfast-lentil-rice-pancake-also-known-as-dosa-dumplings-known-as-idli-158574513.jpg" alt="indian" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/breakfast`}>
                    <h3 className="name1">breakfast recipes</h3></Link>
      </div>
      </Card>
      
      <Card className="card">
            <Link to={`/meals/lunch`}>
                    <img className="img" src="https://static.toiimg.com/thumb/90934370.cms?width=680&height=512&imgsize=222624" alt="indian" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/lunch`}>
                    <h3 className="name1">lunch recipes</h3></Link>
      </div>
      </Card>
     
      <Card className="card">
            <Link to={`/meals/dinner`}>
                    <img className="img" src="https://static.toiimg.com/thumb/msid-46173052,imgsize-92109,width-400,resizemode-4/46173052.jpg" alt="indian" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/dinner`}>
                    <h3 className="name1">dinner recipes</h3></Link>
      </div>
      </Card>
      </div>
     
   </div>
 
   

  )}