import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { API } from "./global";

export function Reset() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (value) => {
      const data = await fetch(`${API}/reset/${params.get("id")}/${params.get("token")}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(value)
      });
      await data.json();
      toast.success('Your password was reset successfully!', { position: "top-right", autoClose: 2000 });
      navigate("/login");
    },
  });

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-icon">
          <RestaurantMenuIcon />
        </div>
        <h1 className="auth-title">Reset Password</h1>
        <p className="auth-subtitle">Choose a new password for your account</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <TextField
            type="password"
            onChange={handleChange}
            value={values.password}
            name="password"
            label="New Password"
            placeholder="Enter new password"
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" className="auth-submit-btn">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
