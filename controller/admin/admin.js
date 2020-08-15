var express 	= require('express');
var router 		= express.Router();
var employeeModel = require.main.require("./models/employee");


router.get('/', function(req, res){

    if(req.session.username!=null)
    {
        res.render("admin/admin");
    }
    else
    {
        res.redirect("/login");
    }

});

router.get('/search',function(req,res){

    if(req.session.username!=null)
    {
        employeeModel.getAll((result)=>{
            res.render("admin/search",{result});
        });
    }
    else
    {
        res.redirect("/login");
    }
});

router.get('/getdata/byid/:id',function (req,res) {

    if(req.session.username!=null)
    {
        var data = {empid:''};
        data.empid=req.params.id;
        employeeModel.getUserById(data,(result)=>{
            res.send(result);
        });
    }
    else
    {
        res.send("<script>alert('invalid request')</script>')");
    }
});

router.get('/getdata/byusername/:username',function (req,res) {

    if(req.session.username!=null)
    {
        var data = {username:''};
        data.username=req.params.username;
        employeeModel.getUserByUsername(data,(result)=>{
            res.send(result);
        });
    }
    else
    {
        res.send("<script>alert('invalid request')</script>')");
    }
});
 
module.exports= router;