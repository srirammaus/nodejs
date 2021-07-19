//function addd

function add(a,b){
	this.a=a;
	this.b=b;
	var sum = this.a + this.b;
	console.log(sum);
	var tp=typeof(sum);
	console.log(tp);
	convert(sum)
	c__(sum)

}
function convert(sum){
	var stt=sum.toString()
	var typp=typeof(stt);
	console.log(stt);
	console.log(typp);
	var nambi=Number(stt);
	console.log(nambi);
	console.log(typeof(nambi));
}
function c__(sum){
	//string to int
	//int to float constains 00000
	var s_=sum.toPrecision(6)
	var tpp=typeof(s_)
	console.log(s_);
	console.log(tpp);

	
	//console.log(---);
}
add(3,6)