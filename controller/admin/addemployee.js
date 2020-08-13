var express 	= require('express');
const { Result } = require('express-validator');
var router 		= express.Router();
var allusermodel = require.main.require("./models/alluser.js");


router.get('/', function(req, res){

   if(req.session.username!=null)
   {
       res.render("admin/addemployee");
   }
   else
   {
       res.redirect("/login");
   }
    
});

module.exports= router;