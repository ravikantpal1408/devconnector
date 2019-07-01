const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
 
// local js imports
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// use express
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

//connect to mongo db
mongoose.connect(db)
    .then(()=> console.log('Mongo DB Connected'))
    .catch((error)=> console.log(error));

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// use routes 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// server configuration
const port = process.env.PORT || 5000;
app.listen( port , () => {
    console.log(`Server is listening on port ${port}`);
})