const express = require('express');
const path = require('path');
//Used for authentication
const session = require('express-session');
//Express/Handlebars compatibility
const exhbs = require('express-handlebars');
//Sets up the routes for the application
const routes = require('./controllers');
//Uses sequelize
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
