//const express = require('express');
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import { ENV } from './lib/env.js';

dotenv.config();

const app = express();

const __dirname = path.resolve();

const PORT = process.env.PORT || ENV.PORT || 3000;
const server = app.listen(PORT, () => console.log('Server is running on port:', PORT));

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the other process or set a different PORT.`);
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});

app.get('/health', (req, res)=> {
    res.status(200).json({ msg: "api is up and running" })
})

app.get('/books', (req, res)=> {
    res.status(200).send('this is books endpoint');
})




// make our app ready for deployment
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // SPA catch-all
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
}