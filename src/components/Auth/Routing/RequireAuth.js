import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth-context';

const RequireAuth = () => {
    const { auth } = useAuth();
    let location = useLocation();

    if(!auth) {
        return (
            <Navigate to="/auth/signin" state={ { from: location } } />
        );
    }
    return <Outlet />;
};
export default RequireAuth;