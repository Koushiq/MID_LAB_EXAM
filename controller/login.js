var express 	= require('express');
const { Result } = require('express-validator');
var router 		= express.Router();
var allusermodel = require.main.require("./models/alluser.js");


var user ={
    username:'',
    password:'',
    role:''
};


router.get('/', function(req, res){

    console.log("here");
    res.render('index');
    
});


router.post('/', function(req, res)
{
    user.username=req.body.username;
    user.password=req.body.password;
    allusermodel.validate(user,(result)=>{
        if(result.length==1)
        {
            req.session.username=user.username;
            user.role=result[0].role;

            if(user.role=="user")
            {
                res.redirect("/user/employee");
            }
            else if(user.role=="admin")
            {
                res.redirect("/admin/admin");
            }
            else
            {
                res.send("<h1>Error in login</h1>");
            }
        }
        else
        {
            res.redirect("/login");
        }
    });
});

module.exports = router;