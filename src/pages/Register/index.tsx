import { useState } from 'react';
import { Form, Formik } from 'formik';
import { Button, TextField, Card, Typography, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import './register.css'
import { ApiUrl } from '../../utils/api';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters long')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{5,})/,
          "Must Contain 5 Characters, One Alphabet and One Number")
        .required('Password is required')
});

interface registerValue {
  name: string,
  email: string,
  password: string
}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterForm: React.FC = () => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values : registerValue) => {
    setIsLoading(true);

    const Url = ApiUrl + '/user/register'
    try {
      const response = await fetch(Url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registration',
          text: 'Registered successfully, redirect to loginpage.',
        });
        
        navigate('/login')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration failure',
          text: 'Registration failed. Please check your data.',
        });
      }
      
      setIsLoading(false);
    
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while processing your request. Please try again later.')
      Swal.fire({
        icon: 'error',
        title: 'Registration failure',
        text: 'An error occurred while processing your request. Please try again later.',
      });
    }
  }     

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
                type='submit'
                variant="contained"
                color="primary"
                disabled={isLoading || isSubmitting}
                fullWidth
              >
                {isLoading ? 'Signing Up...' : 'SignUp'}
              </Button>
              <h4 className='h4' style={{color:'grey', fontSize: 18}}>or</h4>              
              <Button
                onClick={()=> navigate('/login')}
                type="button"
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
