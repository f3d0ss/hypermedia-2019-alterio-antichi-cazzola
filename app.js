const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/users');
const pageRoutes = require('./routes/page');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'public/pages');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/assets')));
app.use('/user', userRoutes);
app.use('/', pageRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening at ${port}`);