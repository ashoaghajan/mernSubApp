import axios from 'axios';


export const signupUser = async (email: string, password: string) => {
    try{
        const { data } = await axios.post('http://localhost:5000/auth/signup', { email, password });
        return data;
    }
    catch(err){
        console.log(err)
    }
}

export const loginUser = async (email: string, password: string) => {
    try{
        const { data } = await axios.post('http://localhost:5000/auth/login', { email, password });
        return data;
    }
    catch(err){
        console.log(err)
    }
}

export const getUser = async () => {
    try{
        const { data } = await axios.get('http://localhost:5000/auth/me');
        return data;
    }
    catch(err){
        console.log(err)
    }
}