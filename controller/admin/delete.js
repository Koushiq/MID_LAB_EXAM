var express 	= require('express');
const e = require('express');
const { stat } = require('fs');
var router 		= express.Router();
var employeeModel = require.main.require("./models/employee.js");
var alluserModel = require.main.require("./models/alluser.js");
router.get('/:id', function(req, res){

    if(req.session.username!=null)
    {
        var userid = {
            empid:req.params.id
        }
        employeeModel.getUserById(userid,(result)=>{
            if(result.length==1)
            {
                res.render("admin/delete",{result})
            }
            else
            {
                res.send("<h1>Failed</h1>");
            }
        });
        
    }
    else
    {
        res.redirect("/login");
    }

});
router.get('/:id/:flag', function(req, res){

    if(req.session.username!=null)
    {
        var userid = {
            empid:req.params.id
        }
        employeeModel.getUserById(userid,(result)=>{
            if(result.length==1)
            {
                alluserModel.deleteUser(result[0].username,(status)=>{
                    if(status)
                    {
                        employeeModel.deleteUserById(userid,(status)=>{
                            if(status)
                            {
                                res.redirect("/admin/allemployeelist"); // if deleted then will be redirected !
                            }
                            else
                            {
                                res.send("<h1>Something went wrong</h1>");
                            }
                        });
                    }
                    else
                    {
                        res.send("<h1>Operation Failed</h1>");
                    }
                }); 
            }
            else
            {
                res.send("<h1>Something Failed</h1>");
            }
        });
    }
    else
    {
        res.redirect("/login");
    }

});
 
module.exports= router;