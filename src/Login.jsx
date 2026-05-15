import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { API } from './global';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from './StateProvider';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export function Login() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [formstate, setFormstate] = useState("success");
  const [showPassword, setShowPassword] = useState(false);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (value) => {
      console.log(value);
      addlogin(value);
    }
  });

  const addlogin = async (value) => {
    const data = await fetch(`${API}/api/userLogin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(value)
    });
    if (data.status == 401) {
      console.log("error");
      setFormstate("error");
      toast.error('Invalid Credentials!', {
        position: "top-right",
        autoClose: 2000,
        color: "white"
      });
    } else {
      setFormstate("success");
      const result = await data.json();
      console.log(result);
      localStorage.setItem("token", result.token);
      toast.success('Login Successful!', {
        position: "top-right",
        autoClose: 2000,
        color: "white"
      });
      navigate("/allrecipe");
    }
  };

  const signin = e => {
    dispatch({
      type: "SET_USER",
      user: values.email,
    });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-icon">
          <RestaurantIcon />
        </div>
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your account</p>

        {formstate === "success" ? null : (
          <div className='sign1'>
            <p className='sign'>Invalid Credentials</p>
          </div>
        )}

        <form className='login' onSubmit={handleSubmit}>
          <TextField
            value={values.email}
            name="email"
            onChange={handleChange}
            label="Email Address"
            placeholder="Enter your email"
            fullWidth
          />
          
          <Input
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            name="password"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Enter your password"
            fullWidth
            label="Password"
          />

          <Button
            onClick={signin}
            type="submit"
            color={formstate}
            variant='contained'
            className="login-btn"
          >
            {formstate === "success" ? "Sign In" : "Retry"}
          </Button>
        </form>

        <p className='forgot-link' onClick={() => navigate("/forgot")}>
          Forgot Password?
        </p>

        <p className='signup-link'>
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}