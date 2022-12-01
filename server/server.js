//requires
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const connectDB = require('./app/database/connection');
const path = require('path');

const app = express();

//memory leak
app.set('trust proxy', 1);

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(session({
    name: 'login',
    secret: "xgj2jwwjjas#!dksd11",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: 'movie_app',
      touchAfter: 24 * 3600,
      autoRemove: 'native',
      autoRemoveInterval: 10
    }),
    cookie : {
      secure: true,
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

app.use(express.static(path.join(__dirname, '../client', 'build')));

app.listen(PORT, () => {
  console.log(`Server is on ${PORT}!`); 
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(200).send({ message: 'Hello word!' });
  // res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

app.use('/api', require(path.join(__dirname, 'app', 'routes', 'router.js')));