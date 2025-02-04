import dotenv from 'dotenv';
dotenv.config();

import express from "express";

const app = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');


// Enable JSON
app.use(express.json());

// Enable cookie parsing
app.use(cookieParser());

// Enable Cross Origin Resource Sharing
app.use(cors({
    origin: [
        'http://localhost:4000', 'http://127.0.0.1:4000',
        'http://localhost:3000', 'http://127.0.0.1:3000',
        'http://localhost:3080', 'http://127.0.0.1:3080'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.options('*', cors())

// Routes
import clientRouter from './routers/ClientRouter';
app.use('/client', clientRouter);

// Port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Listening to PORT:', PORT);
});