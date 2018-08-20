const http = require('http');
const fs = require('fs');
const path = require('path');

var server = http.createServer(function(request, response){
  console.log(`${request.method} request for ${request.url}`);
  var page;
  if (request.url === "/" || request.url){
    page = "home";
    fs.readFile('./public/index.html', 'UTF-8', function(error, content){
      if(error){
        console.log('error, somthing went wrong');
      } else {
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(content);
      }
    });
  } else if (request.url.match(/.css$/)){
    var cssPath = path.join(__dirname, ' public', request.url)
    var filestream = fs.createReadStream(cssPath, 'UTF-8');
    response.writehead(200, {'Content-Type': 'text/css'});
    fileStream.pipe(response);
  }
});

  // } else if (request.url === "/contact"){
  //   page = "contact";
  // } else if (request.url === "/about"){
  //   page = "about";
  // } else {
  //   page = "404 page not found";
  // }



//   response.writeHead(200, {'Content-Type':'text/html'});
//   response.end(`
//     <html>
//       <head>
//         <title>Node Server</title>
//       </head>
//       <body>
//         <h1>${page}</h1>
//         <p>${request.url}</p>
//         <p>${request.method}</p>
//       </body>
//     </html>
//
//     `);

server.listen(3000);

console.log('The server is running on port 3000');
