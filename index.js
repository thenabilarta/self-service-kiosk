const express = require('express');
const exhbs = require('express-handlebars');
const routes = require('./routes/handlers');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.engine(
  'hbs',
  exhbs({
    defaultLayout: 'main',
    extname: '.hbs',
  })
);

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
