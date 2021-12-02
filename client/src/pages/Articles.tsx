import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../context/context';
import { fetchArticles } from './../api/articlesApi';
import useStyles from '../styles/articlesStyles';
import { Link } from 'react-router-dom';

interface ArticlesProps {
    
}
 
const Articles: React.FC<ArticlesProps> = () => {

    const [userState]: [User] = useContext(UserContext);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setLoading(true);
        fetchArticles(userState.data!.customerStripeId).then(data => {
            setArticles(data);
            setLoading(false);
        });
    },[userState.data]);

    if(!articles.length && !loading){
        return (
            <div className={classes.emptyArticles}>
                <h2 className={classes.errorHeader}>You do not have access yet</h2>
                <Link className={classes.ancor} to='/articles-plan'>Buy a plan</Link>
            </div>
        )
    }

    return ( 
        <Container className={classes.cardsContainer}>
            {articles.map(article => (
                <div key={article._id} className={classes.card}>
                    <img className={classes.image} src={article.imageUrl} alt={article.title} />
                    <h2 className={classes.header}>{article.title}</h2>
                    <p></p>
                </div>
            ))}
        </Container>
     );
}
 
export default Articles;
