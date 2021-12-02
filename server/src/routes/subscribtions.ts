import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { stripe } from './../utils/stripe';

const router = express.Router();

router.get('/prices', checkAuth, async(req, res) => {
    const prices = await stripe.prices.list({
        apiKey: process.env.STRIPE_SECRET
    });
    res.json(prices);
});

router.post('/session', checkAuth, async(req, res) => {

    const { priceId, customerStripeId } = req.body;
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{
            price: priceId,
            quantity: 1
        }],
        success_url: 'http://localhost:3000/articles',
        cancel_url: 'http://localhost:3000/articles=plan',
        customer: customerStripeId
    }, {
        apiKey: process.env.STRIPE_SECRET
    });
    res.json(session);
});

module.exports = router;