import { useState } from "react";
import { Form, Formik } from "formik";
import { Button, TextField, Card, Typography, CardContent, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ApiUrl } from "../../utils/api";
import { SelectChangeEvent } from '@mui/material/Select'

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Category is required"),
});

interface addCategory {
  name: string;
  is_active: string;
}

const initialValues = {
  name: '',
  is_active: '',
};

const AddCategory: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('authToken')
    const [status, setStatus] = useState(initialValues.is_active);
    
    const handleStatus = (event: SelectChangeEvent) => {
      const newStatus = event.target.value as string;
      setStatus(newStatus);
    }
    
    const handleSubmit = async (values: addCategory) => {
        setIsLoading(true);
        console.log(status)
        let isStatus: boolean;
        if(status === 'true') {
          isStatus = true
        } else {
          isStatus= false
        }
        
        const inputAddData = {
            name: values.name,
            is_active: isStatus
        }

        const Url = ApiUrl + "/category/create";
        const response = await fetch(Url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputAddData),
        });

        console.log(response)
        if (response.ok) {
            alert("Add new category success");
            navigate("/");
        } else {
            alert("Add category failed");
        }
    };

    const handleCancel = () => {
        navigate('/')
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
                                    name="name"
                                    fullWidth
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
                                        value={status}
                                        onChange={handleStatus}
                                    >
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
                                {isLoading ? "Adding..." : "Add"}
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

export default AddCategory;
