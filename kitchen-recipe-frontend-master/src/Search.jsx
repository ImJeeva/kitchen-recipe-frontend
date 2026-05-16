
// import * as React from 'react';

// import { useState, useEffect } from "react";
// import { API } from "./global";
// import axios from "axios";
// import Card from '@mui/material/Card';
// import { Counter } from "./Counter";
// import { Link } from 'react-router-dom';
// import { IconButton } from "@mui/material";
// import SearchIcon from '@mui/icons-material/Search';
// export function Search() {

//   const [posts, setPosts] = useState([]);
//   const [searchTitle, setSearchTitle] = useState("");
//   const [show, setShow] = useState(true);
//   useEffect(() => {
//     const loadPosts = async () => {
     
//       const response = await axios.get(
//         `${API}`,{
//           headers:{
//             "x-auth-token":localStorage.getItem("token")
//           }
//         }
//       );
//       setPosts(response.data);
     
//     };

//     loadPosts();
//   }, []);

//   return (
//   <div className="page1">
//     <div className="inputsearch">
//       {show?
//       <input 
//         style={{ width: "45%", height: "45px", }}
//         type="text"
//         placeholder="Find Your Recipe Here..."
//         onChange={(e) => setSearchTitle(e.target.value)}
        
//       />
//       :null}
//           <IconButton  color="error" size="large" onClick={() => (setShow(!show))} >
//             {show ? <SearchIcon fontSize="inherit"/>:<SearchIcon fontSize="inherit"/>}
//           </IconButton>
//       </div>
    
            
           
//         {posts
//           .filter((value) => {
//             if (searchTitle === "") {
//               return value;
//             } else if (
//               value.title.toLowerCase().includes(searchTitle.toLowerCase())
//             ) {
//               return value;
//             }
//           })
//            .map((item) => {
//                return(
//                <div   key={item.id}>
//                      <Card className="card">
//                           <Link to={`/recipedetails/${item._id}`}>
//                               <img className="img" src={item.image} alt="chiken" />
//                           </Link>
//                       <div className="detail">
//                               <p className="title">{item.cuisines}-cuisine </p>
//                             <Link className='Link' to={`/recipedetails/${item._id}`}>
//                               <h3 className="name">{item.title}</h3></Link>
//                       <div className="count">
//                               <p className="de">{item.rating}</p>
//                             <Counter />
//                       </div>
//                       </div>
//                       </Card>
                               
//                 </div> 
//            )})
//               }
//     </div>
    
//   );
// }

