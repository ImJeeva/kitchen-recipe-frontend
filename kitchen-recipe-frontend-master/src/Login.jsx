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
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export function Login() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [formstate, setFormstate] = useState("success");
  const [showPassword, setShowPassword] = useState(false);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: (value) => {
      addlogin(value);
    }
  });

  const addlogin = async (value) => {
    const data = await fetch(`${API}/userLogin`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(value)
    });
    if (data.status == 401) {
      setFormstate("error");
      toast.error('Invalid Credentials!', {
        position: "top-right",
        autoClose: 2000,
        color: "white"
      });
    } else {
      setFormstate("success");
      const result = await data.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username || values.username);
      dispatch({ type: "SET_USER", user: result.username || values.username });
      toast.success('Login Successful!', {
        position: "top-right",
        autoClose: 2000,
        color: "white"
      });
      navigate("/allrecipe");
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
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        {formstate === "success" ? null : (
          <div className='auth-banner'>
            <p>Invalid Credentials</p>
          </div>
        )}

        <form className='auth-form' onSubmit={handleSubmit}>
          <TextField
            value={values.username}
            name="username"
            onChange={handleChange}
            label="Username"
            placeholder="Enter your username"
            variant="outlined"
            fullWidth
          />

          <TextField
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            name="password"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Enter your password"
            fullWidth
            label="Password"
            variant="outlined"
          />

          <Button
            type="submit"
            variant='contained'
            className="auth-submit-btn"
          >
            Sign In
          </Button>
        </form>

        <p className='auth-forgot' onClick={() => navigate("/forgot")}>
          Forgot Password?
        </p>

        <p className='auth-switch'>
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
