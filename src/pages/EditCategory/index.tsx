import { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button, TextField, Card, Typography, CardContent, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { ApiUrl } from "../../utils/api";
import Swal from "sweetalert2";
import { useAuthChecker } from "../../hook";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Category is required"),
});

interface EditCategory {
  id: string;
  name?: string;
  is_active?: string;
}


const EditCategory: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken')
  useAuthChecker(token)
  const { id } = useParams();
  const Url1 = ApiUrl + `/category/${id}`;
  
  const [category, setCategory] = useState<EditCategory | null>(null);
  const initialValues = {
    id: '',
    name: category?.name,
    is_active: category?.is_active,
  };

  const getCategory = useCallback(
    async () => {
      const response = await fetch(Url1, {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();      
      setCategory(data.data);
    },
    [Url1, token]
  );
  
  useEffect(
    ()=> {
      getCategory();
    },
    [getCategory]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(initialValues.is_active);

  const handleStatus = (event: SelectChangeEvent) => {
    const newStatus = event.target.value as string;
    setStatus(newStatus);
  }

  const handleSubmit = async (values: EditCategory) => {
    setIsLoading(true);

    const isStatus: boolean = status === 'true';

    const inputAddData = {
      id: id,
      name: values.name,
      is_active: isStatus
    }

    const Url = ApiUrl + `/category/update`;
    try {
      await fetch(Url, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputAddData),
      });
      Swal.fire({
        icon: 'success',
        title: 'Add Category Success',
        text: 'Successfully added category.',
        });
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
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
              Edit Category
            </Typography>
            <Form onSubmit={handleSubmit}>
              <CardContent>
                <TextField
                  label="Category"
                  variant="outlined"
                  name="name"
                  fullWidth
                  placeholder={category?.name}
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel htmlFor="status">Status</InputLabel>
                  <Select
                    label="Status"
                    name="is_active"
                    onChange={handleStatus}
                    value={status}
                    required
                  >
                    <MenuItem value=""><em>{category?.is_active ? "Active (curent)" : "Deactive (curent)"}</em></MenuItem>
                    <MenuItem value={"true"}>Active</MenuItem>
                    <MenuItem value={"false"}>Deactive</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
              <Button
                style={{ marginBottom: 10 }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading || isSubmitting}
                fullWidth
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
              <Button
                className="btnTop"
                onClick={handleCancel}
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

export default EditCategory;
