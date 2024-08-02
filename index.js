const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require('express-session');
var flash = require('connect-flash');
const User = require('./models/users.js');
const bodyParser = require('body-parser');
const ExpressError = require('./utils/ExpressError.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;;
const userRoutes = require('./routers/user.js');
const axios = require('axios');
const { log } = require('console');
const { userInfo } = require("os");
const contactdata = require("./models/contactSchema.js");
const port = 8080 | process.env.PORT;
const { v4: uuidv4 } = require('uuid');
const Listing = require("./models/contactSchema.js");
uuidv4(); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/")))
app.use(methodOverride("_method"));


const DB_LINK = process.env.ATLAS_DBLINK;
const store = MongoStore.create({
    mongoUrl: DB_LINK,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600,
    ttl: 20 * 24 * 3600,
});
const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash('error');
    res.locals.mainLink = "/";
    next();
});
app.use(express.json());
app.engine('ejs', ejsMate);
app.listen(port, () => {
    console.log(`${port} Port is Listening`);
})
main()
    .then(() => {
        console.log("Mongodb connection Successfully");
    })
    .catch((err) => {
        console.log(err);
    })


async function main() {
    await mongoose.connect((DB_LINK));
}

// Search API

var options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',

<<<<<<< HEAD
    // headers: {
	// 	'x-rapidapi-key': '3286a6cf9dmsh80f3a0faa61ef82p1f5748jsna61d5973a71d',
	// 	'x-rapidapi-host': 'spotify-scraper.p.rapidapi.com'
	// }
    headers: {
=======
 //    headers: {
	// 	'x-rapidapi-key': '3286a6cf9dmsh80f3a0faa61ef82p1f5748jsna61d5973a71d',
	// 	'x-rapidapi-host': 'spotify-scraper.p.rapidapi.com'
	// }
	headers: {
>>>>>>> 172783af85703504c8beed8933f0841607a0a1a9
		'x-rapidapi-key': '9ecc63482cmsh79fdbcc4e31a22dp12d90bjsnecbc5789de4a',
		'x-rapidapi-host': 'spotify-scraper.p.rapidapi.com'
	}
};
app.use(express.json());
app.use('/', userRoutes);

app.get("/home", (req, res) => {
    res.render("home.ejs");
})
app.get("/login", (req, res) => {
    res.render("./users/login.ejs")
});

// app.get("/home/player",(req,res)=>{
//     res.render("player.ejs");
// })
app.get("/home/player", async (req, res) => {
    try {
        let { search } = req.query;
        if (search == null) {
            console.log(`${search}, Some Error..`);
        }
        const response = await axios.request(
            {
                ...options,
                params: {
                    track: `${search}`
                    // 7d73edc9d4mshead0ad25150f704p1d6463jsn2da0b0d46451
                }
            }
        );
        const playItem = response.data;
        res.render('player', { playItem });
        // res.redirect(response.data.youtubeVideo.audio[0].url);
    } catch (error) {
        console.error(error);
    }
})

app.get("/home/about", (req, res) => {
    res.render("About.ejs");
})
app.get("/signup", (req, res) => {
    res.render("/users/Signup.ejs");
})
app.get("/home/contact", (req, res) => {
    res.render("contact.ejs");
})
app.get("/home/main/db", (req, res) => {
    res.render("db.ejs");
})
app.get("/login",(req,res)=>{
    res.render("login.ejs");
})
app.get("/home/more",(req,res)=>{
    res.render("more.ejs");
})
app.get("/home/confirmation", (req,res)=>{
     res.render("confirmation.ejs");
})
app.get("/home/contact/message",async (req,res)=>{
    let alldata = await Listing.find();
    
    res.render("message.ejs",{alldata});
    // untill you do not render the allListings data will not be printed
 })

app.post("/home/contact",async(req,res)=>{
    let {id} = req.params;
    const newListings = new Listing(req.body.Listing); 
    await newListings.save();
    res.redirect("/home/contact");

})
app.get("/home/contact/message",(req,res)=>{
    res.render("message.ejs");
})


app.delete("/home/contact/message/:id",async(req,res)=>{
    let {id} = req.params;
    const deleteListings = await Listing.findByIdAndDelete(id);
    res.redirect("/home/contact/message");
})

// app.get("/home/contact/message/:id",(req,res)=>{
//     let {id} = req.params;
//     let post = messages.find((p)=> id === p.id);
//     console.log(id);
//     res.send("request working");

// })
// app.delete("/home/contact/message/:id",(req,res)=>{
//     let {id} = req.params;
//     post = messages.filter((p)=> id !== p.id);
// })


  




