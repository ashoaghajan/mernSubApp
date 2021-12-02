import React, { useState, useContext } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { loginUser, signupUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from '../context/context';
import axios from 'axios';

interface ModalComponenProps {
    type: 'Signup' | 'Login'
}

const initState = { email: '', password: '' };
 
const ModalComponent: React.FC<ModalComponenProps> = ({ type }) => {
    const [show, setShow] = useState(false);
    const [state, setState] = useState(initState);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [_, setUserState] = useContext(UserContext);

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleChange = (e: React.ChangeEvent<any>) =>{
        const { name, value } = e.target;
        setState(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async() => {
        const { email, password } = state;
        setError('');
        const data = type === 'Signup' 
            ? await signupUser(email, password) 
            : await loginUser(email, password);

        if(data?.errors.length){
            setError(data.errors[0]);
        }
        else{
            localStorage.setItem('token', data?.data.token);
            setUserState({
                data: data.data.user,
                error: null,
                loading: false
            });
            axios.defaults.headers.common['authorization'] = `Bearer ${data.data.token}`;
            setState(initState);
            navigate('/articles');
        }
    }

    return (
        <>
            <Button variant={type === 'Signup' ? 'primary' : 'danger'} size='lg' 
               style={{ marginRight: '1rem', padding: '0.5 rem 4 rem' }} onClick={handleOpen}
            >
                {type}
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        {type}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>Email</InputGroup.Text>
                        <FormControl type='email' name='email' value={state.email} onChange={handleChange}/>
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>Password</InputGroup.Text>
                        <FormControl type='password' name='password' value={state.password} onChange={handleChange}/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    {error && (
                        <p style={{ color: 'red' }}>{error}</p>
                    )}
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                    <Button variant='primary' onClick={handleSubmit}>{type}</Button>
                </Modal.Footer>
            </Modal>
        </>
    )    
}
 
export default ModalComponent;
