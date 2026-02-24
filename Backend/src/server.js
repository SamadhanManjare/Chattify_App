//const express = require('express');
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import msgRoutes from './routes/msg.route.js';
import path from 'path';
import cors from 'cors';
import { ENV } from './lib/env.js';

import { connectDB } from './lib/db.js';

dotenv.config();


const app = express();

const __dirname = path.resolve();

console.log(ENV.PORT);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", msgRoutes);

//make ready for deployment
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));

    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});