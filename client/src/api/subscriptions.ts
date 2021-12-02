import axios from 'axios';


export const fetchPrices = async () => {
    try{
        const { data } = await axios.get('http://localhost:5000/subs/prices');
        return data;
    }
    catch(err){
        console.log(err)
    }
}

export const createSession = async (priceId: string, customerStripeId: string) => {
    try{
        const { data } = await axios.post('http://localhost:5000/subs/session', {
            priceId,
            customerStripeId
        });
        return data;
    }
    catch(err){
        console.log(err)
    }
}