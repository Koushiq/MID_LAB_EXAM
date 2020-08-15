var express 	= require('express');
const { Result } = require('express-validator');
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
        var user={username:req.session.username};
        /* employeeModel.getUserByUsername(username,(result)=>{
            if(result.length==1)
            {
                result.render('user/myprofile',{result});
            }
            else
            {
                res.redirect("/login");
            }
        }); */
        employeeModel.getUserByUsername(user,(result)=>{
            if(result.length==1)
            {
                res.render('user/myprofile',{result});
            }
            else
            {
                res.redirect("/login");
            }
        });
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