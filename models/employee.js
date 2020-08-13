var db = require('./db');

module.exports ={
    insert: (user, callback)=>{

		var sql = "insert into employee values('','"+user.username+"','"+user.phonenumber+"','"+user.gender+"','"+user.designation+"','n/a' )";
		console.log(sql);
		db.execute(sql, (status)=>{
            if(status)
            {
                callback(true);
            }
            else{
                callback(false);
            }
		});
    },
    getAll:(callback)=>{
        var sql= "select * from employee";
        console.log(sql);
        db.getResults(sql,(result)=>{

            if(result.length>0)
            {
                callback(result);
            }
            else
            {
                callback([]);
            }

        });
    },
    getUserById:(user,callback)=>{
        var sql= "select * from employee where empid='"+user.empid+"' ";
        console.log(sql);
        db.getResults(sql,(result)=>{

            if(result.length>0)
            {
                callback(result);
            }
            else
            {
                callback([]);
            }

        });
    },
    deleteUserById:(user,callback)=>{
        var sql="delete from employee where empid='"+user.empid+"' ";
        console.log(sql);
		db.execute(sql, (status)=>{
            if(status)
            {
                callback(true);
            }
            else{
                callback(false);
            }
		});
    },
}