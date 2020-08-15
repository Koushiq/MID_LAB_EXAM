var express 	= require('express');
var router 		= express.Router();
var employeeModel = require.main.require("./models/employee");
var err = false;

router.get('/:id',function(req,res){
    err=false;
    if(req.session.username!=null)
    {
       
        var userid = {
            empid:req.params.id
        }
        employeeModel.getUserById(userid,(result)=>{
            if(result.length==1)
            {
                console.log(result[0]);
               res.render("admin/update",{result,userid,err});
            }
            else
            {
                res.redirect("/admin/allemployeelist");
            }
        });
    }
    else
    {
        res.redirect("/login");
    }
});

router.get("/",function(req,res){

    res.redirect("/admin/allemployeelist");

});

router.post("/:id",function(req,res){
    var userid = {
        empid:req.params.id
    }
   err=false;
    if( req.body.phonenumber!='' || req.body.gender!='' || req.body.designation!='')
    {
        console.log(req.body);
        employeeModel.updateUserById(req.body.phonenumber,req.body.gender,req.body.designation,req.params.id,(status)=>{
            if(status)
            {
                id = req.params.id;
                employeeModel.getUserById(userid,(result)=>{
                    if(result.length==1)
                    {
                       id=result[0].empid;
                       res.render("admin/update",{result,userid,err});
                    }
                    else
                    {
                        res.redirect("admin/allemployeelist");
                    }
                });
            }
            else
            {
                res.redirect("/admin/allemployeelist");
            }
        });
    }
    else
    {
        err=true;
        employeeModel.getUserById(userid,(result)=>{
            if(result.length==1)
            {
               id=result[0].empid;
               res.render("admin/update",{result,userid,err});
            }
            else
            {
                res.redirect("/admin/allemployeelist");
            }
        });
    }
    
});

module.exports =router;