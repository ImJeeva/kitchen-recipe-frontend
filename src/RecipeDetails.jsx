import { useNavigate, useParams } from 'react-router-dom';
import { API } from "./global";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from './App';

export function RecipeDetails() {
  const navigate=useNavigate()
  const { id } = useParams();

  const { isLoading ,isFetching, data: recipe } = useQuery (
    ["recipes",id], 
    async () => 
       await  fetch(`${API}/${id}`)
           .then((data) => data.json()),
     {
      staleTime: 10000,
      initialData: queryClient       
      .getQueryData(["recipes"])     
      ?.find((mv) => mv._id === id),  

     }               
   );

  const handleImageError = (e) => {
    e.target.src = "https://img.freepik.com/free-photo/vegetable-salad-with-lettuce-spinach-kale-arugula_1339-144456.jpg";
  };

  return (
    <div>
      {isFetching?<h1>loading...</h1>:null}
      <Button startIcon={<ArrowBackIcon/>} className='btn'  onClick={()=>navigate(-1)} variant='contained' color='primary'>Back</Button>
    <Card className='details'>
     {recipe?.video && (
      <iframe
        width="100%" height="650px"
        src={recipe?.video}
        title={recipe?.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen>
      </iframe>
     )}  
    <CardContent>
      <h3 className='recipetitle'>{recipe?.title}</h3>
      <p className='cuisin'>{recipe?.cuisines} cuisine</p>
      
      <p className='rate'>{recipe?.rating}</p>
      
      <div className="detail-meta">
        <span className="meta-badge"><AccessTimeIcon style={{fontSize:20}}/> {recipe?.cookingtime}</span>
        <span className="meta-badge"><PeopleIcon style={{fontSize:20}}/> {recipe?.servings} servings</span>
        <span className="meta-badge">{recipe?.meals}</span>
      </div>
      
      <h3 className='disc'>What Makes Its Special : </h3>
      <p className='disc1'>{recipe?.discription}</p>
      <img className='detailimg' src={recipe?.image} alt={recipe?.title} onError={handleImageError} loading="lazy"/>
      
      <div>
            <h3 className='disc'>Ingredients</h3> 
             {recipe?.ingredients?.map((sub, index) => {
              return <p key={index}>
                 <div className='direct1'> ⭐ {sub}</div>
              </p>
            })} 
          </div>
           
       <div>
            <h3 className='disc'>Directions : </h3> 
             {recipe?.directions?.map((sub, index) => {
              return <p key={index}>
                <div className='direct'>Step {index+1}</div> <div className='direct1'>{sub}</div>
              </p>
            })} 
          </div>
      <p className='direct1'><span className='span1'>Cook's Notes : </span>{recipe?.note}</p>
      </CardContent>
    </Card>
    <Button  endIcon={<ArrowForwardIcon/>} className='btn1'  onClick={()=>navigate("/")} variant='contained' color='primary'>You'll Also Love</Button>
    </div>
  );
}