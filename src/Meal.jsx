

import * as React from 'react';

import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
export function Meal() {
 
  return (
    <div>
      <h1 className='side'>MEALS</h1>
    <div className='cuisines'>
      
      <div>
      <Card className="card">
            <Link to={`/meals/breakfast`}>
                    <img className="img" src="https://thumbs.dreamstime.com/z/south-indian-breakfast-idli-dosa-chutney-indian-breakfast-lentil-rice-pancake-also-known-as-dosa-dumplings-known-as-idli-158574513.jpg" alt="breakfast" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/breakfast`}>
                    <h3 className="name1">breakfast Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/meals/lunch`}>
                    <img className="img" src="https://static.toiimg.com/thumb/90934370.cms?width=680&height=512&imgsize=222624" alt="lunch" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/lunch`}>
                    <h3 className="name1">lunch Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/meals/dinner`}>
                    <img className="img" src="https://static.toiimg.com/thumb/msid-46173052,imgsize-92109,width-400,resizemode-4/46173052.jpg" alt="dinner" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/dinner`}>
                    <h3 className="name1">dinner Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/meals/desserts`}>
                    <img className="img" src="https://img.taste.com.au/xi2t8DpL/taste/2016/11/lemon-panna-cotta-with-vodka-blueberry-syrup-92005-1.jpeg" alt="desserts" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/desserts`}>
                    <h3 className="name1">desserts Recipes</h3></Link>
      </div>
      </Card>
      </div>   <div>
      <Card className="card">
            <Link to={`/meals/briyani`}>
                    <img className="img" src="https://c.ndtvimg.com/2022-04/fq5cs53_biryani-doubletree-by-hilton_625x300_12_April_22.jpg" alt="
                    briyani" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/briyani`}>
                    <h3 className="name1">briyani Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/meals/soup`}>
                    <img className="img" src="https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Noodle-Soup.jpg" alt="soup" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/soup`}>
                    <h3 className="name1">soup Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/meals/sidedish`}>
                    <img className="img" src="https://www.acouplecooks.com/wp-content/uploads/2019/09/Sweet-Potato-Wedges-004.jpg" alt="sidedish" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/sidedish`}>
                    <h3 className="name1">sidedish Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/meals/drinks`}>
                    <img className="img" src="https://images.theconversation.com/files/194291/original/file-20171113-27595-ox08qm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop" alt="drinks" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/drinks`}>
                    <h3 className="name1">drinks Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/meals/salads`}>
                    <img className="img" src="https://assets.bonappetit.com/photos/6282c9214844aec731451f28/3:2/w_4073,h_2715,c_limit/0622-Summer-Goddess-Chicken-Salad.jpg" alt="salads" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/salads`}>
                    <h3 className="name1">
                      salads Recipes</h3></Link>
      </div>
      </Card>
      </div>
      <div>
      <Card className="card">
            <Link to={`/meals/snacks`}>
                    <img className="img" src="https://media.istockphoto.com/id/1149135424/photo/group-of-sweet-and-salty-snacks-perfect-for-binge-watching.jpg?s=1024x1024&w=is&k=20&c=HqU540K-hjC_RqCM2PCAgin-3E9GJi_YD1m7S77wF8U=" alt="snacks" />
            </Link>
      <div className="detail">
            <Link className='Link' to={`/meals/snacks`}>
                    <h3 className="name1">snacks Recipes</h3></Link>
      </div>
      </Card>
      </div>
     </div>
     </div>
  );
}
