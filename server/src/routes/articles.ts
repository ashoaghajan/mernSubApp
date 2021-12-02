import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import Article from '../models/article';
import { stripe } from './../utils/stripe';

const router = express.Router();

router.get('/:stripeCustomerId', checkAuth, async(req, res) => {
    const { stripeCustomerId } = req.params;
    const subscriptions = await stripe.subscriptions.list({
        customer: stripeCustomerId,
        status: 'all',
        expand: ['data.default_payment_method'] 
    },{
        apiKey: process.env.STRIPE_SECRET
    });

    if(!subscriptions.data.length){
        res.json([]);
    }
    else{
        const plans = subscriptions.data.map((item: any) => item.plan.nickname);
        if(plans.includes('Premium')){
            const articles = await Article.find({});
            res.json(articles);
        }
        else if(plans.includes('Standard')){
            const articles = await Article.find({ access: { $in: [ 'Basic', 'Standard' ] } });
            res.json(articles);
        }
        else if(plans.includes('Basic')){
            const articles = await Article.find({ access: 'Basic' });
            res.json(articles);
        }
        else{
            res.json([]);
        }
    }
});

module.exports = router;