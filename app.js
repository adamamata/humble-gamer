// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);


// Requiring sessions.config 
require("./config/sessions.config")(app);

// Route handling
const index = require("./routes/index.routes");
app.use("/", index);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const gameRouter = require("./routes/game.routes");
app.use("/game", gameRouter);


// Error handling
require("./error-handling")(app);

// Module exports 
module.exports = app;


