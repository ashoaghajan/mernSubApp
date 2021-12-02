import axios from 'axios';

export const fetchArticles = async(customerStripeId: string) => {
    try{
        const { data } = await axios.get(`http://localhost:5000/articles/${customerStripeId}`);
        return data;
    }
    catch(err){
        console.log(err)
    }
}