const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/users');
const pageRoutes = require('./routes/page');
const APIv1Routes = require('./api/v1/main-router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'public/pages');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/assets')));
app.use('/user', userRoutes);
app.use('/', pageRoutes);

// used for API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/v1', APIv1Routes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening at ${port}`);