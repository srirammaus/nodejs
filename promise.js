var db=require(__dirname+'/db.js');
conn =db.connection();


var user_checker = (user)=>	{
	this.user=user;
	//var rf=refresh_token(this.user);
	var s_q="SELECT `username` FROM `auth` WHERE `username` = '"+this.user+"';"
	return new Promise((resolve,reject)=>{
		conn.query(s_q,function(err,res,fields){
			if(err){
				var flag_s = 0;
				console.log("Failed")
				reject(flag_s)
			}
			else{
				console.log("success")
				var string_ =JSON.stringify(res);
				console.log(string_);
				var parser_=JSON.parse(string_);
				if(parser_ [0] != null  ){
					var checker=Object.values(parser_[0]);
					var flag_s = 1;
					resolve(flag_s);

				}
				else{
					var flag_s = 2;
					reject(flag_s)
				}

			}


		})
	})

}
var temp="";
console.log("This is Temp " + temp);
user_checker("shrirammm").then((flag_s) => console.log("Flag is Up => " + flag_s)
								temp=flag_s)
console.log("This is Temp " + temp);