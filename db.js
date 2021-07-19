var db=require('mysql');
var conn= db.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"auth"
});
function connection(){
	conn.connect(function(err){
		if(err){
			console.error(err.stack);
		}else{
			console.log(conn.threadId + "DB_CONNECTED");
		}

	})
	return conn;
}
module.exports = {connection};

//connection();
/*then((flag_s) => {
		console.log("I ama here")
		if(flag_s != 1 ){
			var query="INSERT INTO `auth` (`username`,`name`,`password`,`email`) VALUES ('"+user+"','"+name+"','"+password+"','"+email+"') ;";
			conn.query(query,function(err,res,fields){
				if(err){
					console.log("Something Happened here");
					var flag_i=0;
				}else{
					var flag_i =1;
				}
			})
		}
		return flag_s */