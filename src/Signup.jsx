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
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState("success");
  const [showPassword, setShowPassword] = useState(false);

  const formValidationSchema = yup.object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required").email("Enter valid email"),
    password: yup.string().required("Password is required").min(8, "Password must be 8+ characters"),
  });

  const { handleChange, handleSubmit, values, handleBlur, touched, errors } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
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
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-icon">
          <RestaurantIcon />
        </div>
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join our cooking community</p>

        {show === "success" ? null : (
          <div className='sign1'>
            <p className='sign'>User already exists</p>
          </div>
        )}

        <form className='signup' onSubmit={handleSubmit}>
          <div className="form-row">
            <TextField
              onBlur={handleBlur}
              error={touched.firstname && errors.firstname}
              helperText={touched.firstname && errors.firstname ? errors.firstname : null}
              value={values.firstname}
              name="firstname"
              onChange={handleChange}
              label="First Name"
              placeholder="Enter first name"
            />
            <TextField
              onBlur={handleBlur}
              error={touched.lastname && errors.lastname}
              helperText={touched.lastname && errors.lastname ? errors.lastname : null}
              value={values.lastname}
              name="lastname"
              onChange={handleChange}
              label="Last Name"
              placeholder="Enter last name"
            />
          </div>

          <TextField
            onBlur={handleBlur}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email ? errors.email : null}
            value={values.email}
            name="email"
            onChange={handleChange}
            label="Email Address"
            placeholder="Enter email address"
            fullWidth
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Create password (min 8 characters)"
            fullWidth
            label="Password"
          />
          {touched.password && errors.password && (
            <span className="error-text">{errors.password}</span>
          )}

          <Button
            type="submit"
            color={show}
            variant='contained'
            className="signup-btn"
          >
            Create Account
          </Button>
        </form>

        <p className='login-link'>
          Already have an account? <span onClick={() => navigate("/login")}>Sign In</span>
        </p>
      </div>
    </div>
  );
}