//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import msgRoutes from './routes/msg.route.js';
import path from 'path';

import { connectDB } from './lib/db.js';

dotenv.config();


const app = express();

const __dirname = path.resolve();

console.log(process.env.PORT);

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", msgRoutes);

//make ready for deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));

    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});