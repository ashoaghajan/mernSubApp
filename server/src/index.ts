import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/auth', require('./routes/auth'));
app.use('/subs', require('./routes/subscribtions'));
app.use('/articles', require('./routes/articles'));

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log('Connnected to mongoDB');
        app.listen(5000, () => console.log('Listening to port 5000'));
    })
    .catch(err => { throw new Error(err) })