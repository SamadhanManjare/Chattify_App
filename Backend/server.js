//const express = require('express');
import express from 'express';

const app = express();

app.get('/auth,/api,/signup', (req, res) => {
    res.send('Signup endpoint');
})
app.get('/auth,/api,/login', (req, res) => {
    res.send('Login endpoint');
})
app.get('/auth,/api,/logout', (req, res) => {
    res.send('Logout endpoint');
})

const listener = app.listen(3000, () => {
    console.log('Server is running on port on ' + listener.address().port);
});