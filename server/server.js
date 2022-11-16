//requires
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
//mongodb connection variable
const connectDB = require('./server/database/connection');

//initiate
const app = express();

//dotenv config
// dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

//parse to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongodb connection    
connectDB();

//set sessions
app.use(session({
    name: 'user_session',
    secret: "xgj2jwwjjas#!dksd11",
    saveUninitialized: false,
    resave: false,
    cookie : {
      maxAge: 1000 * 60 * 60 * 24
    }
}));

//log requests
app.use(morgan('tiny'));

//CORS
app.use(cors());

//cookie parser middleware
app.use(cookieParser());

//helmet
app.use(
    helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "blob: data:","https: data:"],
      "default-src": "*",
      "script-src": ["'self'","'unsafe-inline'","'unsafe-eval'"],
      "style-src": ["'self'","'unsafe-inline'"],
      "style-src-elem": ["'self'", "https: data:", "'unsafe-inline'","'unsafe-eval'"]
    }
  })
);

//set view engine
// app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

//load assets
app.use('/js', express.static(path.resolve(__dirname, 'src/assets/js')));
app.use('/node_modules', express.static(path.resolve(__dirname, 'node_modules')));

//load routes
app.use('/', require('./src/routes/router'));

//run server
app.listen(PORT, () => {
    console.log(`Server is on ${PORT}!`); 
});