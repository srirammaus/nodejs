const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
var D_parser=require('datauri/parser');
var fs = require('fs')
var parser = new D_parser();
mergeImages(['./imggg.jpg','./ig.jpg'],{
  Canvas: Canvas,
  Image : Image
})
  .then((b64) =>{ var buff = decodeBase64Image(b64);
  				fs.writeFileSync(__dirname+'/Hello2.jpg', buff.data);

   });
  		
 function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}		
				
  // data:image/png;base64,iVBORw0KGgoAA