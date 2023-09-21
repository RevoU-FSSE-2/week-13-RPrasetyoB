import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ApiUrl } from "../../utils/api";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./home.css";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { Edit } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

const HomePage: React.FC = () => {
    // const navigate = useNavigate()
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategory = async () => {
        try {
        const token = localStorage.getItem("authToken");
        if (!token) {
            return;
        }

        const Url = ApiUrl + "/category";
        const response = await fetch(Url, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setCategories(data.data);
        } else {
            console.error("Failed to fetch categories");
        }
        } catch (error) {
        console.error(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

  return (
    <div className="home-page">
      <Button size="large" href="/add">Add category</Button>
      <TableContainer component={Paper} style={{ width: 800 }}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">&emsp;&nbsp;&emsp;&ensp;&emsp;&ensp;&emsp;Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <StyledTableRow key={category.id}>
                <StyledTableCell component="th" scope="row">
                  {category.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {category.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {category.is_active ? "Active" : "Deactive"}
                </StyledTableCell>
                <StyledTableCell align="right">
                    <Stack direction="row" justifyContent= {"flex-end"} spacing={2}>
                        <Button href="/edit" variant="outlined" startIcon={<Edit />}>
                            Edit
                        </Button>
                        <Button variant="contained" endIcon={<DeleteIcon />}>
                            Del
                        </Button>
                    </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomePage;
