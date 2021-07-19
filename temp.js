/*---Server by Shraim */

//requirements:
var http=require('http');
var fs=require('fs');
var express=require('express'); //--- Framework
var bodyParser= require('body-parser');// ---Url encoded data 
var multer=require('multer'); //Form data 
var db=require(__dirname+'/db.js');
var date=require('date-and-time');
var app=express();
var mul=multer({dest: __dirname+'/'+'uploads'});
var bp=bodyParser({ extended: false});
app.use(mul.any());
app.use(bp);
app.use(express.static('assets'));
app.use(express.static('public'));
var cr =require('crypto');
conn =db.connection();
function files(){
	fs.createWriteStream(__dirname + '/logs.txt', options);
}
function Return(username,callback){
	this.username= username;
	var s_tqq="SELECT `refresh_token`,`access_token` FROM `sesisons` WHERE `username` = '"+this.username+"';"
		conn.query(s_tqq,function(err,res,field){
			if(err){
				global.err_flag=0;
			}else{
				var string__ =JSON.stringify(res);
				var parser__=JSON.parse(string__);
				if(parser__ [0] != null  ){
					var checker=Object.values(parser__[0]);
					var rt=checker[0];
					var at=checker[1];
					global.err_flag = 1;

					console.log("This is at => "+ at + "This is refresh Token => " + rt)
					return callback(err_flag,rt,at);
				}

			}
		})
		;
}
function update(username,callback){
	this.username=username;
	var refresh_tok =cr.randomBytes(30).toString('hex');
	this.refresh_tok= refresh_tok;
	console.log("this is " + this.username +"refresh_tok" + this.refresh_tok)
	var update= "UPDATE `sesisons` SET `refresh_token`='"+this.refresh_tok+"' WHERE `username` = '"+this.username+"' ;";
	conn.query(update,function(err,res,field){
		if(err){
			global.up_flag=0;
		}else{
			console.log("affectedRows  : " + res.affectedRows);
			var parser__=res.affectedRows
			if(parser__  != null  ){
				global.up_flag = 1;
			}else{
				console.log("NOT UPDATE");
				global.up_flag= 2;
			}
		}
		//return global.up_flag;
		//console.log("global Value w => " + global.up_flag)
		return callback(global.up_flag)
	})
	//console.log("global Value => " + global.up_flag)
	//return global.up_flag;
	
}
function refresh_token_session(username,refresh_token,callback){
	this.username = username;
	this.refresh_token=refresh_token; // USE IN RTS
	console.log("This is username : "+ this.refresh_token)
	var s_tq="SELECT * FROM `sesisons` WHERE `username` = '"+this.username+"' AND `refresh_token` = '"+this.refresh_token+"';"
	conn.query(s_tq,function(err,result_,fields){
		if(err){
			global.check_flag = 0;
		}
		else{
			console.log("The Result : " + result_)
			var string_ =JSON.stringify(result_);
			var parser_=JSON.parse(string_);
			if(parser_ [0] != null  ){
				global.check_flag=1;
				var checker=Object.values(parser_[0]);
				console.log("The Seleted Value of checker :  " + checker);
				global.check_flag = 1;
				console.log("MAHN : "+ username)
			}else{
				global.check_flag=2;
			}
			
			
		}
		return callback(check_flag);

	})
	//console.log("HERE IS ALSO GLOBAL VALUE WORKING " + check_flag)
	/*
	if(global.check_flag == 1){
		console.log("I am gonna Start my Work")
		var update= "UPDATE `sesisons` SET `refresh_token`='"+this.refresh_tok+"' WHERE `username` = '"+this.username+"' ;";
		conn.query(update,function(err,res,field){
			if(err){
				global.up_flag=0;
			}else{
				var string__ =JSON.stringify(res.affectedRows);
				console.log(res.affectedRows);
				var parser__=JSON.parse(string__);
				console.log("UPDATED content : " + parser__[0])
				if(parser__ [0] != null  ){
					var checker=Object.values(parser__[0]);
					global.up_flag = 1;
				}
			}
		})
	}
	console.log("The Global check Value 2 : "+ global.check_flag)
	if(global.up_flag== 1){
		var s_tqq="SELECT `refresh_token`,`access_token` FROM `sesisons` WHERE `username` = '"+this.username+"';"
		conn.query(s_tqq,function(err,res,field){
			if(err){
				global.err_flag=0;
			}else{
				var string__ =JSON.stringify(res);
				var parser__=JSON.parse(string__);
				if(parser__ [0] != null  ){
					var checker=Object.values(parser__[0]);
					var at=checker[0];
					var rt=checker[1];
					global.err_flag = 1;

					console.log("This is at => "+ at + "This is refresh Token => " + rt)
					return callback(at,rt);
				}

			}
		})
	}
	console.log("The Global check Value 3 : "+ global.check_flag)*/
}
function refresh_token(username){  // USED IN TOKEN FUNCTION 
	this.username=username;
	var refresh_tok =cr.randomBytes(30).toString('hex')
	return refresh_tok;
}
function insert(user,time,callback){
	const hash= cr.createHash('sha512',user); 
	const beta =hash.digest('base64');
	this.user=user;
	var rf=refresh_token(this.user);
	var q="INSERT INTO `sesisons` (`username`, `access_token`,`validatation_st`,`refresh_token`) VALUES ('"+this.user+"','"+beta+"','"+time+"' ,'"+rf+"');";

	conn.query(q,function(err,results,fields){
		if(err){
			//console.log(err); -- creaate error log and store it there.
			global.flag_i = 0;
		}else{
			//console.log(results);
			global.flag_i=1;
			
		}
		return callback(global.flag_i);
	})
	var Ignore="ALTER IGNORE TABLE `sesisons` ADD UNIQUE INDEX idx_name (username,access_token);";
		conn.query(Ignore,(err,ress)=>{
			if(err){
				global.flag_ig=0;
			}else{
				global.flag_ig = 1;
			}
		})
}
function token(user,callback){
	// const hash= cr.createHash('sha512',user); 
	// const beta =hash.digest('base64');
	this.user=user;
	var rf=refresh_token(this.user);
	var s_q="SELECT `username` FROM `sesisons` WHERE `username` = '"+this.user+"';"

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
				global.flag_s = 3;
			}

		}
		return callback(global.flag_s);

	})
	//console.log("GLOBAL VALUE IS WORKING  : " + global.flag_s)
	/*
	if(global.flag_s != 1 && global.flag_s != 0){
		var q="INSERT INTO `sesisons` (`username`, `access_token`,`validatation_st`,`refresh_token`) VALUES ('"+this.user+"','"+beta+"','"+time+"' ,'"+rf+"');";

		conn.query(q,function(err,results,fields){
			if(err){
				//console.log(err); -- creaate error log and store it there.
				global.flag_i = 0;
			}else{
				//console.log(results);
				global.flag_i=1;
			}
			
		})
		var Ignore="ALTER IGNORE TABLE `sesisons` ADD UNIQUE INDEX idx_name (username,access_token);";
		conn.query(Ignore,(err,ress)=>{
			if(err){
				global.flag_ig=0;
			}else{
				global.flag_ig = 1;
			}
		})
	}*/
}

function get_all(user,callback){

	this.user=user;

	var s_qq="SELECT * FROM `sesisons` WHERE `username` = '"+this.user+"';"
	conn.query(s_qq,function(err,res,fields){
		if(err){
			global.flag_ = 0;
		}
		else{
			var string_ =JSON.stringify(res);
			console.log("The string_  : " + string_);
			var parser_=JSON.parse(string_);
			console.log("this is parser  : "+parser_[0])
			//console.log(typeof(parser_[0]));
			if(parser_ [0] != null  ){
				console.log("This is Result : " )
				var a_t=Object.values(parser_[0]);
				var r_t=Object.values(parser_[0]);
				var a=a_t[2];
				var r=r_t[4]
				console.log("The Seleted Value :  " + a  + "the refresh token is  " + r);
				global.flag_ = 1;
			}else{
				global.flag_= 2;
			}
			
		}
		return callback(flag_,a,r);
	})
	
}

function login(username,password,callback){
	quer="SELECT `username`,`password` FROM `auth` WHERE `username`= username;";
	//var flag="";
	conn.query(quer,function(error,results,fields){
		if(error) {
			console.error(error);
		}else{
			var string_ =JSON.stringify(results);
			var parser_=JSON.parse(string_);
			checker=Object.values(parser_[0]);
			if(checker[1] == password){
				var response={
					"status": "success",

				}
			}else{
				var response={
					"status":"failure",
				}
			}
			
		}
		return callback(response);
		
	});
	

}
function counter (username,cooky,callback){
	quer="SELECT count(*) as total FROM `sesisons` WHERE `username`= '"+username+"' AND `access_token`='"+cooky+"' ;";
	conn.query(quer,(err,res,field)=>{
		const count= res[0].total;
		return callback(count);
	});
}
function del(valid_time,username,cooky){
		const p_time= Date.now();
		this.username=username;
		this.cooky=cooky;
		if(p_time > valid_time){
			counter(this.username,this.cooky,(count)=>{
				if(count > 0 ){
					var que= "DELETE  FROM `sesisons` WHERE `username` ='"+this.username+"'  AND `access_token`='"+this.cooky+"' "
					conn.query(que,(err,res,fields)=>{
						if(err){
							console.error(err);
						}
						console.log("Your Quey or Delete Request upddated" + res.affectedRows); //affectedRows
						
					})

				}else{
					global.flag = 1;
					console.log("I am inside for this : " + this.username);
				}
			})
			console.log("outside : " + this.username + " The Flag " + global.flag)
			return global.flag;
			
		}
}

function expiry(username,cooky,callback){
	//let dt= date.format(Date.now());
		// const dt = Date.now();
		// const dd=Date.now() + 1000;
		// console.log(dt);
		// console.log(dd);
		this.username=username;
		this.cooky=cooky;
	
	counter(this.username,this.cooky,(count)=>{
		if(count > 0 ){
			//`id`,
			quer="SELECT `validatation_st` FROM `sesisons` WHERE `username`= '"+this.username+"' AND `access_token`='"+this.cooky+"' ;";
			conn.query(quer,(err,res,fields)=>{
				var parser_=JSON.parse(JSON.stringify(res[0]));
				//console.log("this is result " + Object.values(parser_));/console.log(valid_time)
				//var valid_time=parser_;console.log(typeof(valid_time));
				var valid_time=Number(Object.values(parser_));
				var v_time=valid_time + 10000;
				//del(v_time,username,cooky);
				var something = function(){setInterval(function (){ del(v_time,username,cooky) ;},1000);} 
				something();


			});
		}
	});
	
	
}

app.get('/index',function(req,resp){
		console.log("connection Established");

		resp.sendFile(__dirname + '/'+'index.html');

});
app.post('/login',function(req,resp){ // API for Login authentication
	var checker= [];

	var username=req.body.username;
	var password=req.body.password;
	var ip= req.ip;
	const dtt= new Date()
	const dt = date.format(dtt,'YYYY/MM/DD HH:mm:ss')
	var data_1= {"username" : username ,"IP" : ip ,"Backend_ time" : dt };
	var data = JSON.stringify(data_1);
	fs.appendFileSync(__dirname+'/Userlog.txt', data + "\n");
	checker.push(req.body);
	console.log("This Is Login Username  : " + username);
	console.log("This is Login Password  : " + password);
	//-----------------------INITIALIZATION ------------------------------------//
	stroage=JSON.stringify(checker)
	st=JSON.parse(stroage)
	lt=Object.keys(st[0]).length;
	this.username=username;
	this.password=password;
	const time=Date.now();
	this.time=time;
	this.ip=ip;
	if(lt > 2 || lt < 2){
		resp.redirect('index');
	}else{
		login(username,password,function (res){
			//resp.send(res);
			
			token(this.username,(flag_s)=>{
				if(flag_s == 1){
					get_all(this.username,(flag_,a,r)=>{
						if(flag_ == 1){

							var sender={
									"status" : res,
									"access_token" : a,
									"valid_time" : 7200,
									"refresh_token" : r,
								}
							resp.send(sender);
						}else{
							rs={
									"error": "This Server Has Some error We will update you soon - 1", 
									"ip" : this.ip
							}
							resp.send(rs);
							data=JSON.stringify(rs);
							fs.appendFileSync(__dirname+'/error.log.txt',data);
						}	
					})
					
						
				}
				else if(flag_s == 2){
					insert(this.username,this.time,(flag_i)=>{
						if(flag_i == 1){
							console.log("Insert Query Executed For This Username : " + this.username);
							get_all(this.username,(flag_,a,r)=>{
								if(flag_ == 1){

									var sender={
											"status" : res,
											"access_token" : a,
											"valid_time" : 7200,
											"refresh_token" : r,
										}
									resp.send(sender);
								}else{
									rs={
											"error": "This Server Has Some error We will update you soon - 1",
											"ip" : this.ip 
									}
									resp.send(rs);
									data=JSON.stringify(rs);
									fs.appendFileSync(__dirname+'/error.log.txt',data + "\n");
								}	
							})
						}else{
							rs={
								"error": " Internal Server Error",
								"ip" : this.ip
							}
							resp.send(rs);
							data=JSON.stringify(rs);
							fs.appendFileSync(__dirname+'/error.log.txt',data + "\n");
						}
					});
				}
				else
				{
					rs={
							"error": "This Server Has Some error We will update you soon -4", 
							"ip" : this.ip
					}
					resp.send(rs);
					data=JSON.stringify(rs);
					fs.appendFileSync(__dirname+'/error.log.txt',data + "\n");
				}
			});
		});
	}
	

})
app.post('/refresh',function(req,res){ // ---- Refresh Token API
	var rf=req.body.refresh_token;
	var username=req.body.username;

	refresh_token_session(username,rf,(check_flag)=>{	
		if(check_flag == 1){

			update(username,(flag)=>{
									//return callback(flag);
						
				if(flag == 1){
					Return(username,(err_flag,refresh_tok,access_token)=>{
						if(err_flag == 1){
							console.log("this is Result : " +refresh_tok);
							response={
								"access_token" : access_token,
								"refresh_token" : refresh_tok
			
								}
							res.send(response)
						}
						
					})
					
				}else{
					res.send("Bad response")
				}	
			})		

			
		}else{
			res.send("Bad response - 2")
		}			
	})			
			
})
app.get('/main',function(req,res){
	var auth_header=req.headers.authorization;
	console.log(auth_header);
	res.send(auth_header);
})
app.all('*', function (req, res) {
    res.sendFile(__dirname+'/assets/error.html');
})
var start_service=app.listen(8081,function(req,resp){
	addr=start_service.address().address;
	port=start_service.address().port;
	console.log("Service Runnning at http://%s:%s",addr,port);

})

//http.createServer(app.listen(8081));


/* ------------------------------------------------------------------GARBAGE------------------------------------------------------------------
	//if(flag==1){
					//resp.setHeader('Content-Type', 'text/plain');
					//resp.writeHead(200,{ 'Content-Type': 'text/plain' });
					//resp.cookie('token',beta,{expire : new Date(Date.now() + 1000), httpOnly: true });
					//resp.cookie('token',beta,{expires : false ,maxAge : 10000 , httpOnly: true });//expires : new Date(Date.now() + 10000)
				
					//setInterval(expiry,500);
					//setTimeout(dd,10000);
					//expiry(this.username,beta);
					//resp.status_code(200);
					//resp.redirect("index");
					
					
				//}

---------------------------------------------------------------
	//checker.push(username);
	//password=req.body.password;
	//console.log(lt);
	//console.log(st);

	//quer="SELECT `validatation_st` FROM `sesisons` WHERE `username`= '"+username+"' AND `access_token`='"+cooky+"' ;";
---------------------------------------------------------------

	// function dd(){
// 	var q="DELETE  FROM `sesisons` WHERE `username` ='shrirammm'  AND `access_token`='z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==' "
	

// 	conn.query(q,(err,res,fields)=>{
// 		console.log("Your Quey or Delete Request upddated" + res[0]);
// 	})
		
// }

---------------------------------------------------------------

//console.log("Final Int Time :" + res[0].total);

---------------------------------------------------------------

// if(err){
			// 	console.error(err);
			// }else{
			//global.ressp= ress;
			//console.log("Insider :" +ressp.affectedRows);
			//}
		//console.log("Outsider : " + global.ressp)

---------------------------------------------------------------

		//console.log("Stack is here");
			//console.log("this is parser  : "+parser_)
			//console.log(typeof(parser_[0]));
			//console.log("The string_  : " + string_);
			//console.log("The Seleted Value :  " + checker);
--------------------------------------------------------------------OVE#ER----------------------------------------------------------
*/
