import React, { useEffect, useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { createSession, fetchPrices } from '../api/subscriptions';
import { UserContext } from '../context/context';
import useStyles from '../styles/articlesPlanStyles';

interface ArticlesPlanProps {
    
}

const backgroundColors: any = {
    Basic: "rgb(104, 219, 104)",
    Standard: "rgb(185, 42, 23, 0.835)",
    Premium: "pink",
};
 
const ArticlesPlan: React.FC<ArticlesPlanProps> = () => {

    const [prices, setPrices] = useState<Price[]>([]);
    const classes = useStyles();
    const [userState]: [User] = useContext(UserContext);

    useEffect(() => {
        fetchPrices().then(data => {
            const pricesData = data?.data;
            setPrices(pricesData);
        })
    },[]);

    const handlePurchase = async(priceId: string) => {
        const data = await createSession(priceId, userState.data!.customerStripeId);
        window.location.href = data.url;
    }

    return ( 
        <div className={classes.container}>
            {prices.map(price => (
                <Card key={price.id} className={classes.card}>
                    <div className={classes.cardHeader} style={{ backgroundColor: backgroundColors[price.nickname] }}>
                        <div className={classes.priceCircle}>
                            <p className={classes.priceText}>{price.unit_amount / 100}$</p>
                        </div>
                    </div>
                    <Card.Body>
                        <Card.Title className={classes.cardTitle}>{price.nickname}</Card.Title>
                        <Button variant='primary' className='mt-2' onClick={() => handlePurchase(price.id)}>
                            By now
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}
 
export default ArticlesPlan;
