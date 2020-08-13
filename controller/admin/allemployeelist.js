var express 	= require('express');
const e = require('express');
var router 		= express.Router();
var employeeModel = require.main.require("./models/employee.js");



router.get('/', function(req, res){

    if(req.session.username!=null)
    {
        employeeModel.getAll((result)=>{
            res.render("admin/allemployeelist",{result});

        });
        
    }
    else
    {
        res.redirect("/login");
    }

});
 
module.exports= router;