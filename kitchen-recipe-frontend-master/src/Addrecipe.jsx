import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { API } from "./global";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import TitleIcon from '@mui/icons-material/Title';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import PublicIcon from '@mui/icons-material/Public';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from './App';

const formValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  image: yup.string().required("Image URL is required").url("Enter a valid URL"),
  video: yup.string().transform((v) => (v ? v : undefined)).url("Enter a valid URL").notRequired(),
  discription: yup.string().required("Description is required"),
  main_content: yup.string().required("Main ingredient is required"),
  cuisines: yup.string().required("Cuisine is required"),
  meals: yup.string().required("Meal type is required"),
  cookingtime: yup.string().required("Cooking time is required"),
  servings: yup.number().required("Servings is required").positive().integer(),
  note: yup.string().required("Note is required"),
  directions: yup.array().of(yup.string().required("Cannot be empty")).min(1),
  ingredients: yup.array().of(yup.string().required("Cannot be empty")).min(1),
});

const REQUIRED_FIELDS = ["title", "image", "discription", "main_content", "cuisines", "meals", "cookingtime", "servings", "note"];

export function Addrecipe() {
  const navigate = useNavigate();

  const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } = useFormik({
    initialValues: {
      title: "",
      image: "",
      video: "",
      discription: "",
      main_content: "",
      cuisines: "",
      meals: "",
      cookingtime: "",
      servings: "",
      note: "",
      rating: "⭐⭐⭐⭐⭐",
      directions: [""],
      ingredients: [""],
    },
    validationSchema: formValidationSchema,
    onSubmit: (value) => {
      addrecipes.mutate(value);
    }
  });

  const addrecipes = useMutation({
    mutationFn: (value) =>
      fetch(`${API}/addrecipe`, {
        method: "POST",
        body: JSON.stringify([value]),
        headers: { "Content-Type": "application/json" },
      }),
    onMutate: async (value) => {
      await queryClient.cancelQueries(["recipes"]);
      const previousRecipes = queryClient.getQueryData(["recipes"]);
      queryClient.setQueryData(["recipes"], (oldRecipes) => [
        ...(oldRecipes || []),
        { ...value, id: Date.now() },
      ]);
      return { previousRecipes };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["recipes"], context.previousRecipes);
    },
    onSuccess: () => {
      toast.success('🥗 Recipe added successfully!', { position: "top-right", autoClose: 1500 });
      navigate("/allrecipe");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["recipes"]);
    },
  });

  const addDirection = () => setFieldValue('directions', [...values.directions, ""]);
  const removeDirection = (index) => setFieldValue('directions', values.directions.filter((_, i) => i !== index));

  const addIngredient = () => setFieldValue('ingredients', [...values.ingredients, ""]);
  const removeIngredient = (index) => setFieldValue('ingredients', values.ingredients.filter((_, i) => i !== index));

  const filledCount = REQUIRED_FIELDS.filter((f) => String(values[f] || "").trim()).length
    + (values.ingredients.some((i) => i.trim()) ? 1 : 0)
    + (values.directions.some((d) => d.trim()) ? 1 : 0);
  const totalFields = REQUIRED_FIELDS.length + 2;
  const progress = Math.round((filledCount / totalFields) * 100);

  const looksLikeImage = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)/i.test(values.image) || /^https?:\/\/images\.unsplash\.com/i.test(values.image);

  return (
    <Box className="recipe-form-page">
      <form onSubmit={handleSubmit} className="recipe-form-container">
        <div className="recipe-form-header">
          <div className="auth-icon"><RestaurantMenuIcon /></div>
          <h1>Add Your Recipe</h1>
          <p>Share your favorite dish with the Kitchen Recipe community.</p>
          <div className="recipe-form-progress">
            <div className="recipe-form-progress-track">
              <div className="recipe-form-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>{progress}% complete</span>
          </div>
        </div>

        <div className="recipe-form-steps">
        <div className="recipe-form-section">
          <div className="recipe-form-step">
            <span className="recipe-form-step-num">1</span>
            <h2>Basic Details</h2>
          </div>
          <TextField
            label="Title"
            placeholder="e.g. Chicken 65"
            fullWidth
            variant="outlined"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
            InputProps={{ startAdornment: <InputAdornment position="start"><TitleIcon fontSize="small" /></InputAdornment> }}
          />
          <TextField
            label="Image URL"
            placeholder="https://example.com/photo.jpg"
            fullWidth
            variant="outlined"
            name="image"
            value={values.image}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.image && Boolean(errors.image)}
            helperText={touched.image && errors.image}
            InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon fontSize="small" /></InputAdornment> }}
          />
          {values.image && (
            <div className={`recipe-form-preview ${looksLikeImage ? 'is-visible' : ''}`}>
              <img
                src={values.image}
                alt="Preview"
                onError={(e) => { e.target.style.opacity = 0; }}
                onLoad={(e) => { e.target.style.opacity = 1; }}
              />
              <span>Live preview</span>
            </div>
          )}
          <TextField
            label="Video URL (optional)"
            placeholder="https://youtube.com/embed/..."
            fullWidth
            variant="outlined"
            name="video"
            value={values.video}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.video && Boolean(errors.video)}
            helperText={touched.video && errors.video}
            InputProps={{ startAdornment: <InputAdornment position="start"><VideocamIcon fontSize="small" /></InputAdornment> }}
          />
          <TextField
            label="Description"
            placeholder="Share the story behind your recipe"
            fullWidth
            multiline
            minRows={2}
            variant="outlined"
            name="discription"
            value={values.discription}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.discription && Boolean(errors.discription)}
            helperText={touched.discription && errors.discription}
          />
          <TextField
            label="Main Ingredient"
            placeholder="e.g. chicken"
            fullWidth
            variant="outlined"
            name="main_content"
            value={values.main_content}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.main_content && Boolean(errors.main_content)}
            helperText={touched.main_content && errors.main_content}
          />

          <div className="form-row">
            <TextField
              label="Cuisine"
              placeholder="e.g. indian"
              variant="outlined"
              name="cuisines"
              value={values.cuisines}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.cuisines && Boolean(errors.cuisines)}
              helperText={touched.cuisines && errors.cuisines}
              InputProps={{ startAdornment: <InputAdornment position="start"><PublicIcon fontSize="small" /></InputAdornment> }}
            />
            <TextField
              label="Meal Type"
              placeholder="e.g. lunch"
              variant="outlined"
              name="meals"
              value={values.meals}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.meals && Boolean(errors.meals)}
              helperText={touched.meals && errors.meals}
              InputProps={{ startAdornment: <InputAdornment position="start"><RestaurantIcon fontSize="small" /></InputAdornment> }}
            />
          </div>

          <div className="form-row">
            <TextField
              label="Cooking Time"
              placeholder="e.g. 1 hr"
              variant="outlined"
              name="cookingtime"
              value={values.cookingtime}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.cookingtime && Boolean(errors.cookingtime)}
              helperText={touched.cookingtime && errors.cookingtime}
              InputProps={{ startAdornment: <InputAdornment position="start"><AccessTimeIcon fontSize="small" /></InputAdornment> }}
            />
            <TextField
              label="Servings"
              placeholder="e.g. 4"
              type="number"
              variant="outlined"
              name="servings"
              value={values.servings}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.servings && Boolean(errors.servings)}
              helperText={touched.servings && errors.servings}
              InputProps={{ startAdornment: <InputAdornment position="start"><PeopleIcon fontSize="small" /></InputAdornment> }}
            />
          </div>

          <TextField
            select
            label="Rating"
            fullWidth
            variant="outlined"
            SelectProps={{ native: true }}
            name="rating"
            value={values.rating}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
            <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
            <option value="⭐⭐⭐">⭐⭐⭐</option>
            <option value="⭐⭐">⭐⭐</option>
            <option value="⭐">⭐</option>
          </TextField>
        </div>

        <div className="recipe-form-section">
          <div className="recipe-form-step">
            <span className="recipe-form-step-num">2</span>
            <h2>Ingredients</h2>
          </div>
          <p className="recipe-form-hint">Enter one ingredient per line, including quantity and prep (e.g. "2 cups rice, rinsed").</p>
          {values.ingredients.map((val, index) => (
            <div className="recipe-form-row" key={index}>
              <span className="recipe-form-row-badge">{index + 1}</span>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={`Ingredient ${index + 1}`}
                name={`ingredients[${index}]`}
                value={val}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.ingredients && Boolean(errors.ingredients?.[index])}
              />
              <IconButton color="error" type="button" onClick={() => removeIngredient(index)} disabled={values.ingredients.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button startIcon={<AddCircleOutlineIcon />} className="recipe-form-add-btn" onClick={addIngredient} type="button">
            Add Ingredient
          </Button>
        </div>

        <div className="recipe-form-section">
          <div className="recipe-form-step">
            <span className="recipe-form-step-num">3</span>
            <h2>Directions</h2>
          </div>
          <p className="recipe-form-hint">Explain each step: prep, cooking time, temperature, etc.</p>
          {values.directions.map((val, index) => (
            <div className="recipe-form-row" key={index}>
              <span className="recipe-form-row-badge">{index + 1}</span>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={`Step ${index + 1}`}
                name={`directions[${index}]`}
                value={val}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.directions && Boolean(errors.directions?.[index])}
              />
              <IconButton color="error" type="button" onClick={() => removeDirection(index)} disabled={values.directions.length <= 1}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button startIcon={<AddCircleOutlineIcon />} className="recipe-form-add-btn" onClick={addDirection} type="button">
            Add Step
          </Button>
        </div>

        <div className="recipe-form-section">
          <div className="recipe-form-step">
            <span className="recipe-form-step-num">4</span>
            <h2>Cook's Notes</h2>
          </div>
          <TextField
            placeholder="Add any helpful tips or ingredient substitutions"
            fullWidth
            multiline
            minRows={2}
            variant="outlined"
            name="note"
            value={values.note}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.note && Boolean(errors.note)}
            helperText={touched.note && errors.note}
          />
        </div>
        </div>

        <Button className="auth-submit-btn recipe-form-submit" type="submit" variant="contained" disabled={addrecipes.isLoading}>
          {addrecipes.isLoading ? (
            <CircularProgress size={22} thickness={5} sx={{ color: '#fff' }} />
          ) : (
            <><CheckCircleIcon sx={{ mr: 1 }} /> Add Recipe</>
          )}
        </Button>

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
      </form>
    </Box>
  );
}
