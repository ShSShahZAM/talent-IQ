//const express = require('express');
import express from 'express';
import path from 'path';

import { ENV } from './lib/env.js';

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.get('/health', (req, res)=> {
    res.status(200).send('api is up and running');
})

app.get('/books', (req, res)=> {
    res.status(200).send('this is books endpoint');
})




// make our app ready for deployment
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
}
    
app.listen(ENV.PORT, ()=> console.log('Server is running on port:', ENV.PORT));