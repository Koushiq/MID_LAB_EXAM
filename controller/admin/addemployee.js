var express 	= require('express');
const { Result } = require('express-validator');
var router 		= express.Router();
var allusermodel = require.main.require("./models/alluser.js");
var employeemodel = require.main.require("./models/employee.js");

var userdata= {
    username:'',
    password:'',
    phonenumber:'',
    gender:'',
    designation:''
}

var err = {
    success:false
}

router.get('/', function(req, res){
    err.success=false;
    userdata.username='';
    userdata.password='';
    userdata.phonenumber='';
    userdata.gender='';
    userdata.designation='';

   if(req.session.username!=null)
   {
       res.render("admin/addemployee",{err});
   }
   else
   {
       res.redirect("/login");
   }
    
});


router.post('/', function(req, res){

    userdata.username='';
    userdata.password='';
    userdata.phonenumber='';
    userdata.gender='';
    userdata.designation='';
    if(req.session.username!=null)
    {
        userdata.username=req.body.username;
        userdata.password=req.body.password;
        userdata.phonenumber=req.body.phonenumber;
        userdata.gender=req.body.gender;
        userdata.designation=req.body.designation;

        if(userdata.username!='' && userdata.username.length>8 && userdata.password!='' && userdata.password.length>=8 && userdata.phonenumber!='' && userdata.phonenumber.length==11 && (userdata.gender=="male" || userdata.gender=="female")  )
        {
            allusermodel.insertByAdmin(userdata,(status)=>{
                if(status)
                {
                    employeemodel.insert(userdata,(status)=>{
                        if(status)
                        {
                            err.success=true;
                            res.render("admin/addemployee",{err});
                        }
                        else
                        {
                            res.send("<h1>Server Error </h1>");
                        }

                    });
                }
                else
                {
                    res.send("<h1>Huge Error </h1>");
                }
            });
        }
        else
        {
            err.success="invalid";
            res.render("admin/addemployee",{err});
        }
    }
    else
    {
        res.redirect("/login");
    }
     
 });

module.exports= router;