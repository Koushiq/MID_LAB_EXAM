var express 	= require('express');
const { Result } = require('express-validator');
var router 		= express.Router();
var employeeModel = require.main.require("./models/employee");
const fileUpload = require('express-fileupload');
const { v4 : uuidv4 } = require('uuid');
router.use(fileUpload());

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

router.post('/updateprofile', function(req, res){

        var userdata= {
        username:'',
        password:'',
        phonenumber:'',
        gender:'',
        designation:'',
        propic:''
      }


    if(req.session.username!=null)
    {
        userdata.username=req.session.username;
        userdata.password=req.body.password;
        userdata.phonenumber=req.body.phonenumber;
        userdata.gender=req.body.gender;
        userdata.designation=req.body.designation;
        userdata.propic =req.files;
        if( userdata.password!='' && userdata.password.length>=8 && userdata.phonenumber!='' && userdata.phonenumber.length==11 && (userdata.gender=="male" || userdata.gender=="female") )
        {
           if(userdata.propic!=null)
           {
                userdata.propic=req.files.propic;
                var extension= userdata.propic.name.split(".");
                if(extension[1]=="jpg" || extension[1]=="png" || extension[1]=="giff" || extension[1]=="jpeg")
                {
                    var picname= uuidv4();
                    var picpath='res/propic/'+picname+'.jpg';
                    userdata.propic.mv(picpath, function(error) {
                        if(error)
                        {
                            console.log("server crashed for picpath");
                            res.send("<h1>Server Crashed</h1>");
                        }
                    });
                    userdata.propic=picpath;
                    console.log("Hello User"+userdata);
                    employeeModel.update(userdata,status=>{
                        if(status)
                        {
                            res.redirect("/employee");
                        }
                        else
                        {
                            res.redirect("/");
                        }
                    });

                }
           }
           else
           {
                res.redirect("/employee");
           }
        }
        else
        {
            res.redirect("/employee");
        }
    }
    else
    {
        res.redirect("/login");
    }



});

module.exports=router;