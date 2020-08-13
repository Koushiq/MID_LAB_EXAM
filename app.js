var express 	= require('express');
var exSession 	= require('express-session');
var bodyParser 	= require('body-parser');

var login= require("./controller/login");
var addemployee = require("./controller/admin/addemployee");
var admin = require("./controller/admin/admin");

var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false}));

app.use("/admin",admin);
//
app.use("/admin/addemployee",addemployee);

app.use("/login",login);


app.get('/', function(req, res){
	res.redirect("/login");
});

app.listen(3000, function(){
	console.log('express http server started at...3000');
});