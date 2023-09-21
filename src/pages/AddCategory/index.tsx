import { useState } from "react";
import { Form, Formik } from "formik";
import { Button, TextField, Card, Typography, CardContent, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
});

const initialValues = {
  category: '',
  status: ''
};

const AddCategory: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: unknown) => {
    setIsLoading(true);

    const apiUrl = "https://example.com/api/login";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      alert("Login successful, redirect to homepage.");
      navigate("/");
    } else {
      alert("Login failed. Please check your credentials.");
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
          <Card className="form-card">
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              Add Category
            </Typography>
            <Form onSubmit={handleSubmit}>
              <CardContent>
                <TextField
                  label="Category"
                  variant="outlined"
                  name="category"
                  fullWidth
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.category && errors.category)}
                  helperText={touched.category && errors.category}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel htmlFor="status">Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                  >
                    <MenuItem value={'active'}>Active</MenuItem>
                    <MenuItem value={'deactive'}>Deactive</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
              <Button
                style={{marginBottom: 10}}
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading || isSubmitting}
                fullWidth
              >
                {isLoading ? "Adding..." : "Add"}
              </Button>              
              <Button
                className="btnTop"
                href="/"
                variant="outlined"
                color="primary" 
                fullWidth
              >
                Cancel
              </Button>
            </Form>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default AddCategory;
