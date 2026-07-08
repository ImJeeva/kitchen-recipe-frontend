



import "./App.css";
import { Counter } from "./Counter";
import {Routes, Route,useNavigate, Navigate, Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Logo } from "./Logo";
import { Recipelist } from "./Recipelist";
import { RecipeDetails } from "./RecipeDetails";
import { Addrecipe } from "./Addrecipe";
// import { Search } from "./Search";
import { CuisinePage, Indian, Mexican, Italian, German, Greek, Chinese, Japanese, Turkish, Spanish, French, American, Thai } from "./Indian";
import { Chicken } from "./Chicken";
import { Cheese } from "./Cheese";
import { Vegitable } from "./Vegitable";
import { Choco } from "./Choco";
import { Fish } from "./Fish";
import { Mutton } from "./Mutton";
import { Seafood } from "./Seafood";
import { Pasta } from "./Pasta";
import { Egg } from "./Egg";
import { Beef } from "./Beef";
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

import SynagogueIcon from '@mui/icons-material/Synagogue';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
import { Breadcrumbs } from "./Breadcrumbs";
import { ScrollToTop } from "./ScrollToTop";
import { useStateValue } from "./StateProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();

const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  minWidth: 0,
  padding: theme.spacing(3),
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

  React.useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (!user && localStorage.getItem("token") && savedUsername) {
      dispatch({ type: "SET_USER", user: savedUsername });
    }
  }, []);

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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color="secondary" position="fixed">
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Box onClick={() => navigate("/")} sx={{ cursor: 'pointer', color: 'inherit' }}>
            <Logo />
          </Box>
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
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { label: 'Recipes', path: "/allrecipe", icon: <MenuBookIcon /> },
            { label: 'Add Recipe', path: '/addrecipe', icon: <AddCircleIcon /> },
            { label: 'About Us', path: '/about', icon: <InfoIcon /> },
            { label: 'Cuisines', path: '/cuisine', icon: <SynagogueIcon /> },
            { label: 'Ingredients', path: '/ingredient', icon: <BakeryDiningIcon /> },
            { label: 'Meals', path: '/meal', icon: <LunchDiningIcon /> },
            { label: 'Quantity', path: '/quantity', icon: <RestaurantMenuIcon /> },
            { label: 'Instant Recipes', path: '/quick/data', icon: <RamenDiningIcon /> },
            { label: 'High Rated Recipes', path: '/rated/data', icon: <FastfoodIcon /> },
          ].map(({ label, path, icon }) => (
            <ListItem key={label} disablePadding onClick={() => { navigate(path); handleDrawerClose(); }}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {user ? (
            <ListItem disablePadding onClick={() => { logout(); handleDrawerClose(); }}>
              <ListItemButton>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          ) : (
            [
              { label: 'Signup', path: '/signup', icon: <PersonAddIcon /> },
              { label: 'Login', path: '/login', icon: <LoginIcon /> },
            ].map(({ label, path, icon }) => (
              <ListItem key={label} disablePadding onClick={() => { navigate(path); handleDrawerClose(); }}>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Drawer>
      <Main>
        <DrawerHeader />
        <ScrollToTop />
        <Breadcrumbs />
        <Routes>

 <Route  path="/signup"   element={<Signup />} />
 <Route  path="/login"   element={<Login />} />
 <Route  path="/forgot"   element={<Forgot />} />
 <Route  path="/reset"   element={<Reset />} />

 <Route element={<ProtectedRoute />}>
 <Route  path="/allrecipe"   element={<Recipelist />} />
 <Route  path="/"   element={<Home />} />
 <Route  path="/counter"   element={<Counter />} />
 <Route  path="/recipedetails/:id"   element={<RecipeDetails />} />
 <Route  path="/addrecipe"   element={<Addrecipe />} />
 <Route  path="/cuisines/indian"   element={<Indian />} />
 <Route  path="/cuisines/mexican"   element={<Mexican />} />
 <Route  path="/cuisines/italian"   element={<Italian />} />
 <Route  path="/cuisines/german"   element={<German />} />
 <Route  path="/cuisines/greek"   element={<Greek />} />
 <Route  path="/cuisines/chinese"   element={<Chinese />} />
 <Route  path="/cuisines/japanese"   element={<Japanese />} />
 <Route  path="/cuisines/turkish"   element={<Turkish />} />
 <Route  path="/cuisines/spanish"   element={<Spanish />} />
 <Route  path="/cuisines/french"   element={<French />} />
 <Route  path="/cuisines/american"   element={<American />} />
 <Route  path="/cuisines/thai"   element={<Thai />} />
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
 <Route  path="/meals/sidedish"   element={<Sidedish />} />
 <Route  path="/quick/data"   element={<Quik />} />
 <Route  path="/rated/data"   element={<Rated />} />
 <Route  path="/highquantity/data"   element={<High />} />
 <Route  path="/lowquantity/data"   element={<Low />} />
 <Route  path="/cuisine"   element={<Cuisine />} />
 <Route  path="/ingredient"   element={<Ingredient />} />
 <Route  path="/meal"   element={<Meal />} />
 <Route  path="/quantity"   element={<Quantity />} />
 <Route  path="/about"   element={<><About /><Footer /></>} />
 <Route  path="*"   element={<Notfound />} />
 </Route>
 </Routes>
      </Main>
    </Box>
    </QueryClientProvider>
  );
}


function ProtectedRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate replace to="/login" />;
}

