const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const publicFolderPath = path.join(__dirname, 'public');
const pagesPath = path.join(publicFolderPath, 'pages');

app.use(bodyParser.json());

//app.use(express.static('public'));
app.use('/users', require('./routes/users'));
app.use('/public', require)
app.set('views', pagesPath);
app.get('/', (req, res) => res.sendFile(path.join(pagesPath, 'home.html')))
app.get('/*', (req, res) => res.sendFile(path.join(publicFolderPath, req.url))
);

// Start the server
const port = process.env.PORT || 80;
app.listen(port);
console.log(`Server listening at ${port}`);