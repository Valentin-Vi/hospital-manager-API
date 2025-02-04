import('dotenv');

import express from "express";
import authRouter from "./authentification/AuthRouter";
const app = express();

// const cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
app.use(cookieParser())
const cors = require('cors');

const PORT = process.env.PORT;

// Enable JSON
app.use(express.json());

// Enable cookie parsing
app.use(cookieParser());

// Enable Cross Origin Resource Sharing
app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true
}));

// app.use((req, res, next) => {
//     res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
//     next();
// });

// Routes
app.use('/auth', authRouter);

// Port
app.listen(PORT, () => {
    console.log('Listening to PORT:', PORT);
});

export default app;
