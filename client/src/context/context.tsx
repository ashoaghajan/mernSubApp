import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getUser } from './../api/authApi';

const UserContext = createContext<any>(null);

 
const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User>({
        data: null,
        error: null,
        loading: true
    });
    const token = localStorage.getItem('token');

    const fetchUser = async() => {
        const data = await getUser();
        if(data?.data && data?.data.user){
            setUser({
                data: data.data.user,
                loading: false,
                error: null
            });
        }
        else if(data?.data && data?.data.errors.length){
            setUser({
                data: null,
                loading: false,
                error: data.data.errors[0]
            });
        }
    }

    useEffect(() => {
        if(token){
            axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
            fetchUser();
        }
        else{
            setUser({
                data: null,
                loading: false,
                error: null
            });
        }
    },[token]);

    return ( 
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
     );
}
 
export { UserContext, UserProvider };
