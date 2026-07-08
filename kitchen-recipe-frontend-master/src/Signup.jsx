import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { API } from './global';
import * as yup from "yup";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState("success");
  const [showPassword, setShowPassword] = useState(false);

  const formValidationSchema = yup.object({
    username: yup.string().required("Username is required").min(3, "Username must be 3+ characters").matches(/^[a-zA-Z0-9_]+$/, "Letters, numbers, and underscores only"),
    email: yup.string().required("Email is required").email("Enter valid email"),
    password: yup.string().required("Password is required").min(8, "Password must be 8+ characters"),
  });

  const { handleChange, handleSubmit, values, handleBlur, touched, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    validationSchema: formValidationSchema,
    onSubmit: (value) => {
      console.log(value);
      addsignup(value);
    }
  });

  const addsignup = async (value) => {
    const data = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(value)
    });
    if (data.status == 400) {
      console.log("error");
      setShow("error");
      toast.error('Username already exists!', {
        position: "top-right",
        autoClose: 1000,
        color: "white"
      });
    } else {
      setShow("success");
      const result = await data.json();
      console.log(result);
      toast.success('Account Created Successfully!', {
        position: "top-right",
        autoClose: 1000,
        color: "white"
      });
      navigate("/login");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-icon">
          <RestaurantMenuIcon />
        </div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join our cooking community</p>

        {show === "success" ? null : (
          <div className='auth-banner'>
            <p>User already exists</p>
          </div>
        )}

        <form className='auth-form' onSubmit={handleSubmit}>
          <TextField
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username ? errors.username : null}
            value={values.username}
            name="username"
            onChange={handleChange}
            label="Username"
            placeholder="Choose a username"
            variant="outlined"
            fullWidth
          />

          <TextField
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email ? errors.email : null}
            value={values.email}
            name="email"
            onChange={handleChange}
            label="Email Address"
            placeholder="Enter email address"
            variant="outlined"
            fullWidth
          />

          <TextField
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password ? errors.password : null}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Create password (min 8 characters)"
            fullWidth
            label="Password"
            variant="outlined"
          />

          <Button
            type="submit"
            variant='contained'
            className="auth-submit-btn"
          >
            Create Account
          </Button>
        </form>

        <p className='auth-switch'>
          Already have an account? <span onClick={() => navigate("/login")}>Sign In</span>
        </p>
      </div>
    </div>
  );
}