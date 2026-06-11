import { useState, useEffect } from "react";
import { API } from "./global";
import Card from '@mui/material/Card';
import { Counter } from "./Counter";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ingredients = [
  { name: 'chicken', img: 'https://deckfamilyfarm.com/wordpress/images/2015/09/poultryHerbRoastedChicken.jpg', title: 'Chicken Recipes', key: 'chicken' },
  { name: 'cheese', img: 'https://wallpapercave.com/wp/wp2309328.jpg', title: 'Cheese Recipes', key: 'cheese' },
  { name: 'vegitable', img: 'https://c4.wallpaperflare.com/wallpaper/147/545/208/nature-basket-apples-grapes-wallpaper-preview.jpg', title: 'Vegitable Recipes', key: 'vegitable' },
  { name: 'choco', img: 'https://thumbs.dreamstime.com/b/chocolate-pralines-17718234.jpg', title: 'Choco Recipes', key: 'choco' },
  { name: 'fish', img: 'https://www.storynory.com/wp-content/uploads/2022/09/ungoldenfish-videoart.jpg', title: 'Fish Recipes', key: 'fish' },
  { name: 'mutton', img: 'https://media.istockphoto.com/id/465150864/photo/five-roaster-lamb-ribs-with-herbs.jpg', title: 'Mutton Recipes', key: 'mutton' },
  { name: 'seafood', img: 'https://media.istockphoto.com/id/1305699663/photo/seafood-platter-grilled-lobster-shrimps-scallops-langoustines-octopus-squid-on-white-plate.jpg', title: 'Seafood Recipes', key: 'seafood' },
  { name: 'pasta', img: 'https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg', title: 'Pasta Recipes', key: 'pasta' },
  { name: 'egg', img: 'https://c.ndtvimg.com/2022-05/pl007fjo_egg-curry_625x300_04_May_22.jpg', title: 'Egg Recipes', key: 'egg' },
  { name: 'beef', img: 'https://wallpaperaccess.com/full/5094397.jpg', title: 'Beef Recipes', key: 'beef' },
];

function IngredientItem({ data }) {
  return (
    <div className="page">
      <Card className="card">
        <Link to={`/recipedetails/${data._id}`}>
          <img className="img" src={data.image} alt={data.title} loading="lazy" />
        </Link>
        <div className="detail">
          <p className="title">{data.cuisines}-cuisine </p>
          <Link className='Link' to={`/recipedetails/${data._id}`}>
            <h3 className="name">{data.title}</h3>
          </Link>
          <div className="count">
            <p className="de">{data.rating}</p>
            <Counter />
          </div>
        </div>
      </Card>
    </div>
  );
}

function IngredientPage({ name, img, title }) {
  const navigate = useNavigate();
  const [recipelist, setRecipelist] = useState([]);

  useEffect(() => {
    fetch(`${API}/ingredients/data?main_content=${name}`)
      .then((val) => val.json())
      .then((list) => {
        if (Array.isArray(list)) setRecipelist(list);
        else setRecipelist([]);
      })
      .catch(() => setRecipelist([]));
  }, [name]);

  return (
    <div className='btns'>
      <Button startIcon={<ArrowBackIcon/>} onClick={()=>navigate(-1)} variant='contained' color='primary'>Back</Button>
      <div>
        <img className="dish" src={img} alt={title} />
        <p className="flag1">{title}</p>
        <div className="list">
          {recipelist.map((mv) => <IngredientItem key={mv._id} data={mv} />)}
        </div>
      </div>
    </div>
  );
}

export function Chicken() { return <IngredientPage {...ingredients[0]} />; }
export function Cheese() { return <IngredientPage {...ingredients[1]} />; }
export function Vegitable() { return <IngredientPage {...ingredients[2]} />; }
export function Choco() { return <IngredientPage {...ingredients[3]} />; }
export function Fish() { return <IngredientPage {...ingredients[4]} />; }
export function Mutton() { return <IngredientPage {...ingredients[5]} />; }
export function Seafood() { return <IngredientPage {...ingredients[6]} />; }
export function Pasta() { return <IngredientPage {...ingredients[7]} />; }
export function Egg() { return <IngredientPage {...ingredients[8]} />; }
export function Beef() { return <IngredientPage {...ingredients[9]} />; }