const session = require('express-session');
const MongoStore = require('connect-mongo');
const MONGO_URI = process.env.MONGODB_URI 

module.exports = app => {
// required for the app when deployed to Heroku (in production)
// app.set('trust proxy', 1);

app.use(
    session({
        secret: process.env.SESS_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: (1000 * 60 * 60 * 24) * 30
        },
        store: new MongoStore({
        mongoUrl: process.env.MONGO_URI
        })
    })
)}