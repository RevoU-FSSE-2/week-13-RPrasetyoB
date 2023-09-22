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
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";

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

const token = localStorage.getItem("authToken");

const ITEMS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategory = async () => {
    try {
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    Swal.fire("Logged Out");
  };

  const DeleteCategory = async (id: string) => {
    try {
      const Url = ApiUrl + `/category/${id}`;
      const response = await fetch(Url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCategories((categories) =>
          categories.filter((category) => category.id !== id)
        );
      } else {
        console.error("Failed to delete category. Status:", response.status);
      }
    } catch (error) {
      console.error("Error while deleting category:", error);
    }
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Filter categories to display only the ones for the current page
  const categoriesToDisplay = categories.slice(startIndex, endIndex);

  // const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="home-page">
      <div className="btn-upper">
        <Button size="large" onClick={() => navigate("/add")}>
          Add category
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="large"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
      <TableContainer component={Paper} style={{ width: 800 }}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">&emsp;&emsp;&emsp;Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesToDisplay.length === 0 ? (
              <TableRow>
                <StyledTableCell colSpan={4} align="center">
                  No data
                </StyledTableCell>
              </TableRow>
            ) : (
              categoriesToDisplay.map((category) => (
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
                    <Stack
                      direction="row"
                      justifyContent={"flex-end"}
                      spacing={2}
                    >
                      <Button href="/edit" variant="outlined" startIcon={<Edit />}>
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => DeleteCategory(category.id)}
                        endIcon={<DeleteIcon />}
                      >
                        Del
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={categories.length}
                page={currentPage - 1}
                rowsPerPage={ITEMS_PER_PAGE}
                onPageChange={(e, page) => handlePageChange(page + 1)}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomePage;
