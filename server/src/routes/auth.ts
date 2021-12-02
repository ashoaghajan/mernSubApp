import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { checkAuth } from './../middleware/checkAuth';
import { stripe } from './../utils/stripe';

const router = express.Router();

router.post('/signup', 
    // validate the email and password
    body('email').isEmail().withMessage('The email is invalid'), 
    body('password').isLength({ min: 5 }).withMessage('The password is too short'), 
    async(req, res) => {

    try{
        const { email, password } = req.body;
        const validationErrors = validationResult(req);

        if(!validationErrors.isEmpty()){
            const errors = validationErrors.array().map(error => error.msg);
            res.json({ errors, data: null });
        }

        const user = await User.findOne({ email });
        if(user){
            res.json({ errors: ['Email already exists!'], data: null });
        }
        else{
            // create stripe customer
            const stripeCustomer = await stripe.customers.create({
                email
            },{
                apiKey: process.env.STRIPE_SECRET
            });
            // create new user in database
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ email, password: hashedPassword, customerStripeId: stripeCustomer.id });
            const token = JWT.sign(
                { email: newUser.email }, 
                process.env.JWT_SECRET as string, 
                { expiresIn: 36000 }
            );

            res.json({ 
                errors: [], 
                data: { 
                    token, 
                    user:  { 
                        id: newUser._id, 
                        email: newUser.email, 
                        customerStripeId: newUser.customerStripeId 
                    } 
                } 
            });
        }
    }   
    catch(err){
        console.log(err)
    }   
});

router.post('/login', async(req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            res.json({ errors: ['User with this email does not exist!'], data: null });
        }
        else{
            const passwordMatches = await bcrypt.compare(password, user.password);
            if(!passwordMatches){
                res.json({ errors: ['Invalid password!'], data: null });
            }
            else{
                const token = JWT.sign(
                    { email: user.email }, 
                    process.env.JWT_SECRET as string, 
                    { expiresIn: 36000 }
                );
    
                res.json({ 
                    errors: [], 
                    data: { 
                        token, 
                        user:  { 
                            id: user._id, 
                            email: user.email,
                            customerStripeId: user.customerStripeId 
                        } 
                    } 
                });
            }
        }
    }   
    catch(err){
        console.log(err)
    }   
});

router.get('/me', checkAuth, async(req, res) => {
    try{
        console.log(req.user)
        const loggedInUser = await User.findOne({ email: req.user });
        res.json({
            errors:[],
            data: {
                user: { 
                    id: loggedInUser._id, 
                    email: loggedInUser.email, 
                    customerStripeId: loggedInUser.customerStripeId 
                }
            }
        })
    }
    catch(err){
        console.log(err)
    } 
});

module.exports = router;