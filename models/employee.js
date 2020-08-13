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
}