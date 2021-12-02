import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/context';

interface ProtectedRouteProps {
    
}
 
const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
    const [state] = useContext(UserContext);

    if(state.loading) return <div>Spinner...</div>

    return state.data ? <Outlet/> : <Navigate to='/'/>
}
 
export default ProtectedRoute;
