var express         =   require("express"),
    app             =   express(),
    bodyParser      =   require("body-parser"),
    methodOverride  =   require("method-override"),
    expressSanitizer=   require("express-sanitizer"),
    mongoose        =   require("mongoose"),
    flash           =   require("connect-flash"),
    passport        =   require("passport"),
    LocalStrategy   =   require("passport-local"),
    ForumPost       =   require("./models/forum"),
    ForumComment    =   require("./models/comment"),
    User            =   require("./models/user");

var commentRoutes   = require("./routes/comments"), 
    forumRoutes     = require("./routes/forum"),
    indexRoutes     = require("./routes/index");


var url = process.env.DATABASEURL || "mongodb://localhost/portfolio"
mongoose.connect(url, {useNewUrlParser: true});

// mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));  
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

// Passport Configuration

app.use(require("express-session")({
    secret: "IM A LOSER WHO STEALS CODE XD",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");

   next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(forumRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started...");
});