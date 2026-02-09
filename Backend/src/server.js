//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import msgRoutes from './routes/msg.route.js';

dotenv.config();


const app = express();

console.log(process.env.PORT);

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", msgRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});