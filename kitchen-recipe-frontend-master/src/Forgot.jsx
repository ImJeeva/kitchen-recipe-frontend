import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { API } from "./global";

export function Forgot() {
  const navigate = useNavigate();

  const { handleSubmit, values, handleChange } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (value) => {
      const data = await fetch(`${API}/forgot`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(value)
      });
      const result = await data.json();
      if (data.status === 404) {
        toast.error(result.status || 'Email not found', { position: "top-right", autoClose: 2000 });
      } else {
        toast.success(result.status || 'Reset instructions sent', { position: "top-right", autoClose: 2000 });
        navigate("/login");
      }
    },
  });

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-icon">
          <RestaurantMenuIcon />
        </div>
        <h1 className="auth-title">Forgot Password</h1>
        <p className="auth-subtitle">Enter your email and we'll help you reset it</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <TextField
            name="email"
            value={values.email}
            onChange={handleChange}
            label="Email Address"
            placeholder="Enter your registered email"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" type="submit" className="auth-submit-btn">
            Send Reset Link
          </Button>
        </form>

        <p className='auth-switch'>
          Remembered your password? <span onClick={() => navigate("/login")}>Sign In</span>
        </p>
      </div>
    </div>
  );
}
