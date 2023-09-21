import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button, TextField, Card, Typography, CardContent } from '@mui/material';
import * as Yup from 'yup';
import './login.css'
import { useNavigate } from 'react-router-dom'
import { ApiUrl } from '../../utils/api';


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface loginValue  {
  email: string,
  password: string
}


const LoginForm: React.FC = ()=> {
  const initialValues = {
    email: '',
    password: '',
  };
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = async (values: loginValue) => {
    setIsLoading(true);

    const Url = ApiUrl + '/user/login';
    try {
      const response = await fetch(Url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json()
      console.log(response)

      if (response.ok) {
        alert('Login successful, redirect to homepage.');
      
      const token = data.data.token
      localStorage.setItem('authToken', token)

        navigate('/')
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while processing your request. Please try again later.')
    }
    

  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          touched,
          errors,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Card className='form-card'>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
              Login Form
            </Typography>
            <Form onSubmit={handleSubmit}>
              <CardContent>
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  fullWidth
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  fullWidth
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ mb: 2 }}
                />
              </CardContent>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading || isSubmitting}
                fullWidth
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              <h4><span>OR</span></h4>
              <Button
                href='/register'
                variant="outlined"
                color="primary"
                disabled={isLoading || isSubmitting}
                fullWidth
              >
                Sign Up
              </Button>
            </Form>
          </Card> 
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
