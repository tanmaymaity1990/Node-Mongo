require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
require('./config/database');

const app = express();

global.site_name = 'Node Mongo';

// Set View engine 
app.set('view engine', 'ejs');

// Middleware array
const middleware = [
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false
    }),
    flash(),
    cors(),
];

app.use(middleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const apiRoutes = require('./routes/api/api.routes');

// API routes
app.use('/api', apiRoutes);

