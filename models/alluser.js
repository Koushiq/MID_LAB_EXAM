var db = require('./db');

module.exports ={
    validate: (user, callback)=>{

		var sql = "select * from alluser where username='"+user.username+"' and password='"+user.password+"'";
	
		console.log(sql);
		db.getResults(sql, (result)=>{
			if(result.length > 0)
			{
				//user.role=result[0].role;
				callback(result);
			}
			else{
				callback([]);
			}
		});
	},
}