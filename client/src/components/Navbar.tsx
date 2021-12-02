import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/context';

interface NavbarProps {
    
}
 
const Navbar: React.FC<NavbarProps> = () => {

    const [state, setState] = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setState({ data: null, loading: false, error: null });
        localStorage.removeItem('token');
        navigate('/');
    }

    return ( 
        <Nav>
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            {state.data && (
                <Nav.Item style={{ marginLeft: 'auto' }}>
                    <Nav.Link href="/" onClick={handleLogout}>Logout</Nav.Link>
                </Nav.Item>
            )}
        </Nav>
     );
}
 
export default Navbar;
