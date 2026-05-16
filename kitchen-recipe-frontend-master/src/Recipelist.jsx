

import { useState } from "react";
import { useEffect } from "react";

import { API } from "./global";
import { useQuery } from "@tanstack/react-query";
import { Recipe } from "./Recipe";
import { queryClient } from "./App";



function checkAuth(res){
  if(res.status===401){
    throw Error("unauthorised");
  }else{
return res.json()
  }
}
function logout(){
  localStorage.clear();
  window.location.href="/signup"
}
export function Recipelist () {

//without tanstack query-> version => 1 => LOW PERFOMANCE

//   const [obj, setObject] = useState([]);
// const getMovies=()=>{
//   fetch(`${API}/allrecipe`,{
//               headers:{
//                 "x-auth-token":localStorage.getItem("token")
//                }
//              })
//       .then((res) => checkAuth(res))
//       .then((mvs) => setObject(mvs))
//       .catch(err=>logout())
// }

//   useEffect(() => getMovies(), []);


//with tanstack query-> version => 2 =>HIGH PERFOMANCE

//tanstack-query-method

const { isLoading ,isFetching, data: obj } = useQuery (
  //cache name
  ["recipes"], 
  //API request
  async () => 
    //PUSH TECHNIQUE:
    //ithula movielist ah load panrapave moviedetails ah vangiruvom so perfomance innum best ah irukum.

    // const recipe= await fetch(`${API}/allrecipe`,{
    //               headers:{"x-auth-token":localStorage.getItem("token")}})
    //               .then((res) => checkAuth(res))
    //               .catch(err=>logout());
    //    recipe.forEach(element => 
    //     queryClient.setQueryData(["recipes",element._id], element)
    //    );
    //     return recipe;

     //NORMAL METHOD:
    
        await fetch(`${API}/allrecipe`,{
          headers:{"x-auth-token":localStorage.getItem("token")}})
          .then((res) => checkAuth(res))
          .catch(err=>logout()),

      

    //options
   {
    staleTime: 10000, //3s la ithu stale akum

    // refetchInterval: 5000, //every 5s request pokum

    retry:3 //ithu suppose reqest fail achina 3 times call akum

   }               
 );

//  console.log("🎉",obj)

if(isLoading){
  return<h3>Loading...</h3>
}


  return (
 
  
    <div>
       <div  className="all">
        {obj.map((mv) =>(
      // Normal method:
        <Recipe key={mv.id} 
        data={mv} 
        id={mv._id} 
          />

       //prefetch method:("HIGH PERFOMANCE")
      // PROS:
       //ithu namma antha recipe mela hover pannum pothe request send pannitum
       // so appram namma atha click pannum pothu takkunu varum
       //CONS:
       //ithu data athikama consume pannum because every hover it send to the request.

          // <div
          // onMouseEnter={() => {
          //   queryClient.prefetchQuery(
          //     ["recipes", mv._id],
          //     async () =>
          //       await fetch(`${API}/${mv._id}`, {
          //         method: "GET",
          //       }).then((data) => data.json())
          //   );
          // }}
          // >
          //    <Recipe key={mv.id} 
          //     data={mv} 
          //      id={mv._id} 
          //    />
          // </div>


          ))}
      </div>
      
    </div>
   
  );
}
