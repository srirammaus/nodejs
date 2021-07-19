/*
var h= 19;
var w=10;

var something = (a,b)=>{
	c= a+b;
	return c;

}
const func= function(a,b){
	sum=a+b;
	return sum;
}
console.log(something(1,2));
console.log(func(1,2));
*/
var bodyParser= require('body-parser');


var express = require('express')
var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/dd', function (req, res) {
  res.send('POST request to the homepage')
})
var start_service=app.listen(8081,function(req,resp){
	addr=start_service.address().address;
	port=start_service.address().port;
	console.log("Service Runnning at http://%s:%s",addr,port);

})