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
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import { useNavigate } from "react-router-dom";
import { useAuthChecker } from "../../hook";
import "./home.css";

// table style //
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px 16px"
  },
}));

// interface //
interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

interface User {
  id: string
}

const HomePage: React.FC = () => {

  // navigation //
  const navigate = useNavigate();

  // auth checker //
  const token = localStorage.getItem('authToken')
  useAuthChecker(token)

  // useState //
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [filter, setFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("")

  // fetching //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCategory = async () => {
    try {
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
  }, [fetchCategory]);

  // log out //
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    Swal.fire("Logged Out");
  };

  //fetch user
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUser = async ()=> {
    try {
      const Url = ApiUrl + '/user/profile'
      const response = await fetch(Url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if(response.ok){
        const data = await response.json()
        console.log(data.data);        
        setUserProfile(data.data)
      }
    } catch (error) {
      console.error(error);      
    }
  }
  useEffect(() => {  
    fetchUser();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // Delete //
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

// filter and pagination //
  const ITEMS_PER_PAGE = 5;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE; 
  const filteredCategories = categories.filter((category) =>
  category.name.toLowerCase().includes(filter.toLowerCase()) &&
  (statusFilter === "" || category.is_active === (statusFilter === "Active")));
  const categoriesToDisplay = filteredCategories.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="home-page" >
      <div className="home-body">
        <div className="btn-upper" >
          <Button size="large" onClick={() => navigate("/add")}>
            Add category
          </Button>
          <div className="filter">
            <input
              type="text"
              placeholder="Filter by name"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>
          <div className="user-control">
            <Button variant="contained" size="medium" onClick={() => navigate(`/profile/:${userProfile?.id}`)} className="btn-profile">
              Profile
            </Button><Button variant="outlined" color="error" size="medium" onClick={handleLogout} className="btn-logout">
              Log Out
            </Button>         
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
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
                  <StyledTableRow key={category.id} className="tr">
                    <StyledTableCell component="th" scope="row" className="td">
                      {category.id.slice(20,36)}
                    </StyledTableCell>
                    <StyledTableCell align="center" className="td name-cell">
                      {category.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {category.is_active ? "Active" : "Deactive"}
                    </StyledTableCell>
                    <StyledTableCell align="right" className="td">
                      <Stack direction="row" justifyContent={"flex-end"} spacing={2}>
                        <Button
                          onClick={() => navigate(`/edit/${category.id}`)}
                          variant="outlined" startIcon={<Edit />}
                          className="btn-edit"
                          size="small"
                          style={{height: 25}}>
                            edit                 
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => DeleteCategory(category.id)}
                          endIcon={<DeleteIcon />}
                          size="small"
                          style={{height: 25}}>
                            del                       
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
                  count={filteredCategories.length}
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
    </div>
  );
};

export default HomePage;
