//requires
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const connectDB = require('./app/database/connection');

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: 'user_session',
    secret: "xgj2jwwjjas#!dksd11",
    saveUninitialized: false,
    resave: false,
    cookie : {
      maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(morgan('tiny'));
app.use(cors());
app.use(cookieParser());
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

app.use('/', require('./app/routes/router'));

app.listen(PORT, () => {
  console.log(`Server is on ${PORT}!`); 
});