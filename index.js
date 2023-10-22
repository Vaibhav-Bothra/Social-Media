const express = require("express");
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

//for session cookie
const session = require("express-session");

const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const db = require("./config/mongoose");

//for scss/sass middleware for converting that file to css
const sassMiddleware = require("node-sass-middleware");

//for showing flash messages
const flash = require("connect-flash");
const customWare = require("./config/middleware");

// for mongostore connection npm install connect-mongo
// const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static("./assets"));

// app.use(cookieParser()); after npm install cookie-parser and require it in cookieParser variable

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    name: "dirProject",
    secret: "blahsomething", //this is the key which is used for encrypting the user id of the cookie.
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // store: new MongoStore({
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
    //     },
    //     function(err){
    //         console.log(err || 'connect-mongodb setup ok');
    //     }
    // )
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setFlash);

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) console.log(`Error in setting up the serve: ${err}`);
  console.log("Successfully setup the server.");
});
