import React, { useEffect, useState } from 'react'
import { useAuthChecker } from '../../hook'
import { ApiUrl } from '../../utils/api'
import { Button, Table, TableBody, TableContainer, TableRow } from '@mui/material'
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper"

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
  

interface userProfile {
    id: string,
    name: string,
    email: string
}

const ProfilePage : React.FC = ()=> {
    const token = localStorage.getItem('authToken')
    useAuthChecker(token)
    const [loading, setLoading] = useState(true)
    const [profilePreview, setProfilePreview] = useState<userProfile>()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchProfile = async () => {
        try {
          const Url = ApiUrl + '/user/profile';
          const response = await fetch(Url, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setProfilePreview(data.data);
          } else {
            console.error('Failed to fetch Profile');
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    useEffect(()=> {
        fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    
    return (
        <div style={{width: '100%', height:'90vh', paddingTop:'20vh'}}>            
            <div style={{marginLeft: 'auto', marginRight: 'auto', width: '140px', marginBottom:'10px'}}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => window.location.replace('/')}>
                    Back to Home
                </Button>
            </div>          
            {loading ? (
            <div>Loading...</div>
            ) : profilePreview ? (
            <TableContainer component={Paper} style={{width: 300, marginLeft: 'auto', marginRight: 'auto'}}>
                <Table aria-label="customized table">
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell variant="head">ID</StyledTableCell>
                      <StyledTableCell>{profilePreview.id}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell variant="head">Name</StyledTableCell>
                      <StyledTableCell>{profilePreview.name}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell variant="head">Email</StyledTableCell>
                      <StyledTableCell>{profilePreview.email}</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
            </TableContainer>
            ) : (
            <div>No profile data available.</div>
            )}
        </div>
      );

}

export default ProfilePage