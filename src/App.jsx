



import "./App.css";
import { Counter } from "./Counter";
import {Routes, Route,useNavigate, Navigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { Logo } from "./Logo";
import { Recipelist } from "./Recipelist";
import { RecipeDetails } from "./RecipeDetails";
import { Addrecipe } from "./Addrecipe";
// import { Search } from "./Search";
import { Indian } from "./indian";
import { Mexican } from "./Mexican";
import { Italian } from "./Italian";
import { German } from "./German";
import { Greek } from "./Greek";
import { Chinese } from "./Chinese";
import { Japanese } from "./Japanese";
import { Turkish } from "./Indian";
import { Spanish } from "./Spanish";
import { Chicken } from "./Chicken";
import { Cheese } from "./Cheese";
import { Vegitable } from "./Vegitable";
import { Choco } from "./Choco";
import { Fish } from "./Fish";
import { Mutton } from "./Mutton";
import { Seafood } from "./Seafood";
import { Pasta } from "./Pasta";
import { Egg } from "./Egg";
import { Lunch } from "./Lunch";
import { Breakfast } from "./Breakfast";
import { Dinner } from "./Dinner";
import { Desserts } from "./Desserts";
import { Drinks } from "./Drinks";
import { Salads } from "./Salads";
import { Briyani } from "./Briyani";
import { Soup } from "./Soup";
import { Snacks } from "./Snacks";
import { Sidedish } from "./Sidedish";
import { Quik } from "./Quik";
import { Rated } from "./Rated";
import { High } from "./High";
import { Low } from "./Low";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';

import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Typography } from "@mui/material";
import SynagogueIcon from '@mui/icons-material/Synagogue';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Cuisine } from "./Cuisine";
import { Ingredient } from "./Ingredient";
import { Meal } from "./Meal";
import { Quantity } from "./Quantity";
import { Notfound } from "./Notfound";
import { About } from "./About";
import { Footer } from "./Footer";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Forgot } from "./Forgot";
import { Reset } from "./Reset";
import { Home } from "./Home";
import { useStateValue } from "./StateProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBars = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function App(){
  const[{user},dispatch]=useStateValue();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate=useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logout=()=>{
    localStorage.clear()
    navigate("/login")
   }

  
  return(
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    <div  >
   
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color="secondary" position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
      <Button  onClick={()=>navigate("/allrecipe")} color="inherit"><Logo/></Button>
     <Button sx={{marginLeft:"auto"}} onClick={()=>navigate("/signup")} color="inherit">{user?"":"Signup"}</Button>
    {user?<Button onClick={()=>logout()} color="inherit">Logout</Button>:
    <Button onClick={()=>navigate("/login")} color="inherit">Login</Button>
    }
       <Button onClick={()=>navigate(localStorage.getItem("token") ? "/allrecipe" : "/")} color="inherit">Recipes</Button>  
     <Button onClick={()=>navigate("/addrecipe")} color="inherit">ADD</Button>      
     <Button onClick={()=>navigate("/about")} color="inherit">About Us</Button>  

        
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem className="menuicon"  disablePadding  onClick={()=>navigate("/cuisine")}>
              <ListItemButton>
              <ListItemIcon>
                  <SynagogueIcon/> 
                </ListItemIcon>
                <ListItemText  primary="Cuisines" />
              </ListItemButton>
            </ListItem>
       
        <ListItem className="menuicon"  disablePadding onClick={()=>navigate("/ingredient")}>
              <ListItemButton>
                <ListItemIcon>
                  <BakeryDiningIcon /> 
                </ListItemIcon>
                <ListItemText primary="Ingredients" />
              </ListItemButton>
            </ListItem>

            <ListItem className="menuicon"  disablePadding onClick={()=>navigate("/meal")}>
              <ListItemButton>
                <ListItemIcon>
                  <LunchDiningIcon /> 
                </ListItemIcon>
                <ListItemText primary="meals" />
              </ListItemButton>
            </ListItem>

            <ListItem className="menuicon"  disablePadding onClick={()=>navigate("/quantity")}>
              <ListItemButton>
                <ListItemIcon>
                  <RestaurantMenuIcon /> 
                </ListItemIcon>
                <ListItemText primary="Quantity" />
              </ListItemButton>
            </ListItem>

            <ListItem className="menuicon"  disablePadding onClick={()=>navigate("/quick/data")}>
              <ListItemButton>
                <ListItemIcon>
                  <RamenDiningIcon /> 
                </ListItemIcon>
                <ListItemText primary="Instant Recipes" />
              </ListItemButton>
              
            </ListItem>

            <ListItem className="menuicon"  disablePadding onClick={()=>navigate("/rated/data")}>
              <ListItemButton>
                <ListItemIcon>
                  <FastfoodIcon /> 
                </ListItemIcon>
                <ListItemText primary="high rated Recipes" />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography >
 
     <Routes>

 <Route  path="/allrecipe"   element={<ProductedRoute><Recipelist /></ProductedRoute>} />
 <Route  path="*"   element={<Notfound />} />
 <Route  path="/"   element={<Home />} />
 <Route  path="/signup"   element={<Signup />} />
 <Route  path="/login"   element={<Login />} />
 <Route  path="/forgot"   element={<Forgot />} />
 <Route  path="/reset"   element={<Reset />} />
 <Route  path="/counter"   element={<Counter />} />
 <Route  path="/recipedetails/:id"   element={<RecipeDetails />} />
 <Route  path="/addrecipe"   element={<Addrecipe />} />
 {/* <Route  path="/search"   element={<Search />} /> */}
 <Route  path="/cuisines/indian"   element={<Indian />} />
 <Route  path="/cuisines/mexican"   element={<Mexican />} />
 <Route  path="/cuisines/italian"   element={<Italian />} />
 <Route  path="/cuisines/german"   element={<German />} />
  <Route  path="/cuisines/greek"   element={<Greek />} />
  <Route  path="/cuisines/chinese"   element={<Chinese />} />
 <Route  path="/cuisines/japanese"   element={<Japanese />} />
 <Route  path="/cuisines/turkish"   element={<Turkish />} />
 <Route  path="/cuisines/spanish"   element={<Spanish />} />
 <Route  path="/ingredients/chicken"   element={<Chicken />} />
 <Route  path="/ingredients/cheese"   element={<Cheese />} />
  <Route  path="/ingredients/vegitable"   element={<Vegitable />} />
  <Route  path="/ingredients/choco"   element={<Choco />} />
  <Route  path="/ingredients/fish"   element={<Fish />} />
 <Route  path="/ingredients/mutton"   element={<Mutton />} />
 <Route  path="/ingredients/seafood"   element={<Seafood />} />
 <Route  path="/ingredients/pasta"   element={<Pasta />} />
 <Route  path="/ingredients/egg"   element={<Egg />} />
 <Route  path="/meals/lunch"   element={<Lunch />} />
 <Route  path="/meals/breakfast"   element={<Breakfast />} />
 <Route  path="/meals/dinner"   element={<Dinner />} />
 <Route  path="/meals/desserts"   element={<Desserts />} />
 <Route  path="/meals/drinks"   element={<Drinks />} />
 <Route  path="/meals/salads"   element={<Salads />} />
 <Route  path="/meals/briyani"   element={<Briyani />} />
 <Route  path="/meals/soup"   element={<Soup />} />
 <Route  path="/meals/snacks"   element={<Snacks />} />
 <Route  path="/meals/Sidedish"   element={<Sidedish />} />
 <Route  path="/quick/data"   element={<Quik />} />
 <Route  path="/rated/data"   element={<Rated />} />
 <Route  path="/highquantity/data"   element={<High />} />
<Route  path="/lowquantity/data"   element={<Low />} />
<Route  path="/cuisine"   element={<Cuisine />} />
<Route  path="/ingredient"   element={<Ingredient />} />
<Route  path="/meal"   element={<Meal />} />
<Route  path="/quantity"   element={<Quantity />} />
  <Route  path="/about"   element={<><About /><Footer /></>} />
 </Routes>
        </Typography>
      </Main>
      
    </Box>
    
    </div>
    </QueryClientProvider>
   
  );
}


function ProductedRoute({children}){
  const token=localStorage.getItem("token");
  return token?(
    token?
    <div>{children}</div>:<h1 className="product">you are unauthorised entry❌</h1>
  ):(
    <Navigate raplace to="/signup"/>
  )
}

