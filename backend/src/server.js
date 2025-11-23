//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './lib/env.js';

dotenv.config();

const app = express();

console.log(ENV.PORT);
console.log(ENV.DB_URL);

app.get('/health', (req, res)=> {
    res.status(200).send('api is up and running');
})
app.listen(ENV.PORT, ()=> console.log('Server is running on port:', ENV.PORT));