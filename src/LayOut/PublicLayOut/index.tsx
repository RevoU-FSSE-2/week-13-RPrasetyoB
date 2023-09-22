import { useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../../component';

const PublicLayout = () => {

    const token = localStorage.getItem('authToken');

    const location = useLocation();

    const isAuth = useMemo(
        () => {
            if(location.pathname) {
                return !!token
            }
            
        },
        [location.pathname, token]
    )

    if(isAuth) {
        return (
            <div>
                <Navbar />
                <Outlet />
            </div>
        )
    }

    return <Navigate to="/login" />
}

export default PublicLayout