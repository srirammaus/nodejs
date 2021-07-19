var db=require(__dirname+'/db.js');
conn =db.connection();
function user_checker(user,access_token,callback){ // NOT IN USER -- USED TO CHECK WHETHER USER IS ALREADY AVAILABLE IN SESSION DB
	this.user=user;
	//var rf=refresh_token(this.user);
	var s_q="SELECT `username` FROM `sesisons` WHERE `username` = '"+this.user+"' AND `access_token`= '"+access_token+"';"

	conn.query(s_q,function(err,res,fields){
		if(err){
			global.flag_s = 0;
			console.log("Failed")
		}
		else{
			console.log("success")
			var string_ =JSON.stringify(res);
			var parser_=JSON.parse(string_);
			if(parser_ [0] != null  ){
				var checker=Object.values(parser_[0]);
				global.flag_s = 1;

			}
			else{
				global.flag_s = 2;
			}

		}
		return callback(global.flag_s);

	})

}
var videos = function (req,res,next){
	var checker= [];
	var access_token=req.query.auth;
	var username=req.query.username;
	checker.push(req.query);
	stroage=JSON.stringify(checker)
	st=JSON.parse(stroage)
	lt=Object.keys(st[0]).length;
	if(lt > 2 || lt < 2){
		res.redirect('index');
	}else{
		console.log(access_token);
		user_checker(username,access_token,function(flag){
			if(flag == 1){
				res.sendFile(__dirname+'/movie.mp4');
			}else{
				res.redirect('index');
			}
		})
		
	}
	next();

}
module.exports = {videos : videos}