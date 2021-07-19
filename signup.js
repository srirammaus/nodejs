var db=require(__dirname+'/db.js');
conn =db.connection();


function user_checker(user,callback)
{
	this.user=user;
	//var rf=refresh_token(this.user);
	var s_q="SELECT `username` FROM `auth` WHERE `username` = '"+this.user+"';"
	
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
					

				}
				else{
					var flag_s = 2;
					
				}

			}

			return callback(flag_s);
		

	})
}

function signup(name ,user,password , cpassword,email){
	return new Promise((resolve,reject)=>{
		user_checker(user,function(flag_s){
			if(flag_s == 2){
				var query="INSERT INTO `auth` (`username`,`name`,`password`,`email`) VALUES ('"+user+"','"+name+"','"+password+"','"+email+"') ;";
				conn.query(query,function(err,res,fields){
					if(err){
						console.log(err);
						var flag_s=3;
						reject(flag_s);
					}else{
						var flag_s =4;
						console.log("Updated");
						resolve(flag_s);
					}
				})
			}else{
				
				flag_i=5;
				reject(flag_i)
			}
		})
	}).then((flag)=>{
		console.log("The Resolve Flag iss => " +  flag);
	}).catch((Exception)=>console.log("The Rejection Flag is =>"+Exception));
	
}

/*
		then((flag_s) => {
		console.log("I ama here")
		if(flag_s == 2){
			var query="INSERT INTO `auth` (`username`,`name`,`password`,`email`) VALUES ('"+user+"','"+name+"','"+password+"','"+email+"') ;";
			conn.query(query,function(err,res,fields){
				if(err){
					console.log(err);
					console.log("Something Happened here");
					var flag_s=3;
				}else{
					var flag_s =4;
					console.log("Updated");
				}
			})
		}
		return flag_s
	}).catch(flag_s => console.log("Error => " + flag_s))

}*/
// var temp="";
// console.log("This is Temp " + temp);
// signup("shrirssa","Maaadasdasdaas","pwd","pwd" ,"Edsdsdsasdasmail");
// console.log("This is Temp sdssdsd " + temp); 
//Test

// function dummy(){
// 	const w=2;
// 	return new Promise((resolve,reject)=>{
// 		if(w == 3){
// 			var flag = 3;
// 			resolve(flag);
// 		}else if(w == 2){
// 			var flag= 2;
// 			reject(flag)

// 		}else{
// 			var flag =1;
// 			reject(flag);
// 		}

// 	}).then((flag)=>console.log("The Resolved FLag is =>" + flag)).catch((flag)=>console.log("the Rejected FFlag is => " + flag))
// }
// dummy()