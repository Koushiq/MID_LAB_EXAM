var express 	= require('express');
var router 		= express.Router();
var employeeModel = require.main.require("./models/employee");


router.get('/', function(req, res){

    if(req.session.username!=null)
    {
        res.render("user/employee");
    }
    else
    {
        res.redirect("/login");
    }

});

router.get('/myprofile', function(req, res){

    if(req.session.username!=null)
    {
        res.render("user/myprofile");
    }
    else
    {
        res.redirect("/login");
    }

});

router.get('/updateprofile', function(req, res){

    if(req.session.username!=null)
    {
        res.render("user/updateprofile");
    }
    else
    {
        res.redirect("/login");
    }

});

module.exports=router;