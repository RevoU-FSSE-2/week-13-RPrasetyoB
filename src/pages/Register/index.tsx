import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button, TextField, Card, Typography, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import './register.css'

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
});


const RegisterForm = () => {

  const navigate = useNavigate()

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values : unknown) => {
    setIsLoading(true);

    const apiUrl = 'https://example.com/api/login';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      alert('Login successful, redirect to homepage.');
    } else {
      alert('Login failed. Please check your credentials.');
    }
    
    navigate('/login')
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
              Registration Form
            </Typography>
            <Form onSubmit={handleSubmit}>
              <CardContent>
              <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  fullWidth
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ mb: 2 }}
                />
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
                variant="contained"
                color="primary"
                disabled={isLoading || isSubmitting}
                fullWidth
              >
                {isLoading ? 'Signing Up' : 'SignUp'}
              </Button>
              <h4><span>OR</span></h4>              
              <Button
                href='/'
                type="submit"
                variant="outlined"
                color="primary"
                disabled={isLoading || isSubmitting}
                fullWidth
              >
                Login
              </Button>
            </Form>
          </Card> 
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
