import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from "./global";
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from './App';
export function Addrecipe() {
  const [inputFields, setInputFields] = useState([""]);
  const [inputFields1, setInputFields1] = useState([""]);
  const [directions, setDirections] = useState([]);
  
  const [ingredients, setIngredients] = useState([]);
  const formValidationSchema=yup.object({
    title: yup.string().required(),
    image:yup.string().required().url(),
    video:yup.string().required().url(),
    discription: yup.string().required(),
    main_content: yup.string().required(),
    cuisines: yup.string().required(),
    meals: yup.string().required(),
    cookingtime: yup.string().required(),
    servings: yup.number().required(),
    note: yup.string().required(),
    directions: yup.array().of(yup.string().required("Cannot be empty")).required(),
    ingredients: yup.array().of(yup.string().required("Cannot be empty")).required(),
   },)
  const{handleSubmit,handleChange,handleBlur,values,touched,errors}=useFormik({
    initialValues:{
      title: "",
      image:"",
      video:"",
      discription: "",
      main_content:"",
      cuisines:"",
      meals:"",
      cookingtime:"",
      servings:"",
      note:"",
      rating:"⭐⭐⭐⭐⭐",
     directions: [directions],
     ingredients: [ingredients],
      
    },
    validationSchema : formValidationSchema,
    onSubmit:(value)=>{
console.log(value)
addrecipes.mutate(value);
    }
  })
  const navigate=useNavigate();




//NORMAL ADDING METHOD

  // const addrecipes=async (value)=>{
   
  //     fetch(`${API}/addrecipe`,{
  //       method:"POST",
  //       body:JSON.stringify([value]),
  //       headers:{"Content-Type": "application/json",},
        
  //     });
  //    navigate("/allrecipe")
  //      };


  //OBTIMISING ADDING METHOD
  // add panrapo takkunu screen la kattum and background fetch akum but screen la kattirum.
  //suppose screen la katrapo entha error vanthalum antha screen la katnatha etuthutu michatha kattum
  //ithu ellam fast ah natakum.

  const addrecipes=useMutation({
    mutationFn:(value) =>
  fetch(`${API}/addrecipe`,{
    method:"POST",
    body:JSON.stringify([value]),
    headers:{"Content-Type": "application/json",
  },
    
  }),
  onMutate: async (value) => {
    await queryClient.cancelQueries(["recipes"]);
    const previousRecipes = queryClient.getQueryData(["recipes"]);

    queryClient.setQueryData(["recipes"], (oldRecipes) => [
      ...oldRecipes,
      { ...value, id: Date.now() },
    ]);

    return {previousRecipes};
  },
  onError: (err, id, context) => {
    queryClient.setQueryData(["recipes"], context.previousRecipes);
  },


    onSettled: () => {
      queryClient.invalidateQueries(["recipes"]);
       },
    
  })
 

  function addInputField(e) {
    console.log(e);
    console.log(errors);
    e.preventDefault();
    setInputFields((inputFields) => [...inputFields, ""]);
    setDirections((directions) => [...directions, ""]);
   
  }

  function addInputField1(e) {
    console.log(e);
    console.log(errors);
    e.preventDefault();
    setInputFields1((inputFields1) => [...inputFields1, ""]);
    
    setIngredients((ingredients) => [...ingredients, ""]);
  }

  function removeInputField(index, e) {
    e.preventDefault();
    const copyInputField = [...inputFields];
    copyInputField.splice(index, 1);
    const directionsCopy = [...directions];
    values.directions.splice(index, 1);
    directionsCopy.splice(index, 1);
    setDirections(directionsCopy);
   
    setInputFields(copyInputField);
  }
  function removeInputField1(index, e) {
    e.preventDefault();
    const copyInputField = [...inputFields1];
    copyInputField.splice(index, 1);
   
    const ingredientsCopy = [...ingredients];
    values.ingredients.splice(index, 1);
    ingredientsCopy.splice(index, 1);
    setIngredients(ingredientsCopy);
    setInputFields1(copyInputField);
  }
  const notify = () => toast.success('🥗successfully added', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    }); 
  return (
   
     <form onSubmit={handleSubmit}>
      <Card  className='formfield'>
     <h2>✨Add your personal recipe 🥗</h2>
     <p className='restitle'>Uploading personal recipes is easy! Add yours to your favorites, share with friends, family, or the Allrecipes community.</p>
     <label className='total'>Title</label>
     <TextField placeholder='eg:chicken 65'     helperText={touched.title && errors.title? errors.title : null} error={touched.title && errors.title} value={values.title} onBlur={handleBlur} name="title" onChange={handleChange}  variant="filled" />
     <label className='total'>image</label>
     <TextField  placeholder='eg:https://cdn.pixabay.com/photo/2015/01/06/16/14/woman-590490__340.jpg'   helperText={touched.image && errors.image? errors.image : null} error={touched.image && errors.image} value={values.image} onBlur={handleBlur} name="image"  onChange={handleChange}   variant="filled" />
     <label className='total'>video</label>
     <TextField placeholder='eg:https://cdn.pixabay.com/photo/2015/01/06/16/14/woman-590490__340.jpg'    helperText={touched.video && errors.video? errors.video : null} error={touched.video && errors.video} value={values.video} onBlur={handleBlur} name="video"  onChange={handleChange} variant="filled" />
     <label className='total'>discription</label>
     <TextField  placeholder='share the story behind your recipe'   helperText={touched.discription && errors.discription? errors.discription : null} error={touched.discription && errors.discription} value={values.discription} onBlur={handleBlur} name="discription"  onChange={handleChange}  variant="filled" />
     <label className='total'>main_ingredient</label>
     <TextField placeholder='eg:chicken'    helperText={touched.main_content && errors.main_content? errors.main_content : null} error={touched.main_content && errors.main_content} value={values.main_content} onBlur={handleBlur} name="main_content"  onChange={handleChange}  variant="filled" />
     <div>
            <h2>Ingredients</h2>
            <p>Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e. Cake, Frosting, Dressing).</p>
            {inputFields1.map((input, index) => {
              return (
                <div className='addfield'  key={index}>
                  <TextField
                    className='inputsize'
                    name={`ingredients[${index}]`}
                    placeholder={`ingredient : ${index+1}`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="filled"
                    error={touched.ingredients && errors.ingredients}
                    helperText={touched.ingredients && errors.ingredients? errors.ingredients : null}
                    value={values.ingredients[index]}
                    required
                  />
                  <IconButton
                  color="error"
                    type="button"
                    onClick={(e) => removeInputField1(index, e)}
                  ><DeleteIcon/></IconButton>
                
                </div>
              );
            })}
            <Button
            className='inputsize'
             variant="contained"
             color="secondary"
              onClick={addInputField1}
              type="button"
            >
               Add ingredients
            </Button>
          </div>
     <label className='total'>cuisines</label>
     <TextField  placeholder='eg:indian'   helperText={touched.cuisines && errors.cuisines? errors.cuisines : null} error={touched.cuisines && errors.cuisines} value={values.cuisines} onBlur={handleBlur} name="cuisines"  onChange={handleChange}  variant="filled" />
     <label className='total'>meals</label>
     <TextField  placeholder='eg:lunch'   helperText={touched.meals && errors.meals? errors.meals : null} error={touched.meals && errors.meals} value={values.meals} onBlur={handleBlur} name="meals"  onChange={handleChange}  variant="filled" />
     <div>
            <h2>directions</h2>
            <p>Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate).</p>
            {inputFields.map((input, index) => {
              return (
                <div className='addfield'  key={index}>
                  <TextField
                  className='inputsize'
                    name={`directions[${index}]`}
                    placeholder={`step : ${index+1}`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="filled"
                    error={touched.directions && errors.directions}
                    helperText={touched.directions && errors.directions? errors.directions : null}
                    value={values.directions[index]}
                    required
                  />
                  <IconButton
                  color="error"
                    type="button"
                    onClick={(e) => removeInputField(index, e)}
                  ><DeleteIcon/></IconButton>
                
                </div>
              );
            })}
            <Button
               className='inputsize'
               variant="contained"
               color="secondary"
              onClick={addInputField}
              type="button"
            >
               Add directions
            </Button>
          </div>
     <label className='total'>cookingtime</label>
     <TextField  placeholder='eg:1 hrs'   helperText={touched.cookingtime && errors.cookingtime? errors.cookingtime : null} error={touched.cookingtime && errors.cookingtime} value={values.cookingtime} onBlur={handleBlur} name="cookingtime"  onChange={handleChange}  variant="filled" />
     <label className='total'>servings</label>
     <TextField  placeholder='eg:5'   helperText={touched.servings && errors.servings? errors.servings : null} error={touched.servings && errors.servings} value={values.servings} onBlur={handleBlur} name="servings"  onChange={handleChange}  variant="filled" type="number"/>
     <label className='total'>note</label>
     <TextField  placeholder='Add any helpful tips about ingredient substitutions'   helperText={touched.note && errors.note? errors.note : null} error={touched.note && errors.note} value={values.note} onBlur={handleBlur} name="note"  onChange={handleChange}  variant="filled" />
     <label className='total'>rating</label>
     <select  value={values.rating} name="rating"  onBlur={handleBlur} onChange={handleChange} label="rating" variant="filled" className='select'>
              <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
              <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
              <option value="⭐⭐⭐">⭐⭐⭐</option>
              <option value="⭐⭐">⭐⭐</option>
              <option value="⭐">⭐</option>
      </select>
     
     
  
     <div>
     <Button className='addbtn' onClick={notify} type="submit" variant="contained">addrecipe</Button>
     <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
     </div>    
     
    
     </Card>
     </form>
    
  );
}
