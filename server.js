const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const nocache = require("nocache");
const flash=require("express-flash")
require('dotenv').config()
    
const app = express();
const port = process.env.PORT || 3000;

const router = require("./router")

app.use(nocache());

// Middleware Configuration
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// View Engine Configuration
app.set('view engine', 'ejs');

// Static Assets Configuration
app.use("/static", express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

// Session Configuration
app.use(session({
    secret: uuidv4(),
    resave: 'false',
    saveUninitialized: true
}));

app.use(flash());

// Router Configuration





app.use('/', router);

// Home Route 
app.get("/", (req, res) => {
    res.render('base', { title: "Login System" });
});
 
// Server Start
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
