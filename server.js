var http = require('http');
var url=require('url');
var fs=require('fs');

http.createServer(function(req,resp){
	 var filerequired = url.parse(req.url).pathname;

	 console.log(filerequired);
	 fs.readFile(filerequired.substr(1).toString(),function(err,data){
	 	if(err){
	 		console.log(err);
	 		resp.writeHead(404, {'Content-Type': 'text/html'});
	 	}else{
	 		resp.writeHead(200, {'Content-Type': 'text/text'});
	 		resp.write(data.toString());
	 		resp.end("you got ur file superbb man!!1");


	 	}
	 });
	 //resp.end();
}).listen(8081);
console.log('Server running at http://127.0.0.1:8081/');