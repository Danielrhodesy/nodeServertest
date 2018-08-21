const http = require('http');
const fs = require('fs');
const path = require('path');
const data = require('./data/products');
const qs = require('querystring')

var server = http.createServer(function(request, response){
    console.log(`${request.method} request for ${request.url}`);

    if(request.method === 'GET'){
        var page;
        if (request.url === '/'|| request.url === "/home" || request.url === "/index" || request.url === "/index.html") {
            page = 'home';
            fs.readFile('./public/index.html', 'UTF-8', function(error, contents){
                if(error){
                    console.log(error);
                } else {
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.end(contents);
                }
            });
        } else if(request.url === "/about" || request.url === "/about.html"){
            fs.readFile('./public/about.html', 'UTF-8', function(error, contents){
                if(error){
                    console.log("error, something went wrong");
                } else {
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.end(contents);
                }
            });
        } else if(request.url === "/contact" || request.url === "/contact.html"){
            fs.readFile('./public/contact.html', 'UTF-8', function(error, contents){
                if(error){
                    console.log("error, something went wrong");
                } else {
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.end(contents);
                }
            });
        } else if(request.url === "/images" || request.url === "/images.html"){
            fs.readFile('./public/images.html', 'UTF-8', function(error, contents){
                if(error){
                    console.log("error, something went wrong");
                } else {
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.end(contents);
                }
            });
        } else if(request.url.match(/.js$/)){
            var jsPath = path.join(__dirname, 'public', request.url);
            var fileStream = fs.createReadStream(jsPath, 'UTF-8');
            response.writeHead(200, {'Content-Type': 'text/javascript'});
            fileStream.pipe(response);
        } else if(request.url.match(/.css$/)){
            var cssPath = path.join(__dirname, 'public', request.url);
            var fileStream = fs.createReadStream(cssPath, 'UTF-8');
            response.writeHead(200, {'Content-Type': 'text/css'});
            fileStream.pipe(response);
        } else if(request.url.match(/.jpg$/)){
            var imagePath = path.join(__dirname, 'public', request.url);
            var imageStream = fs.createReadStream(imagePath);
            response.writeHead(200, {'Content-Type':'image/jpeg'});
            imageStream.pipe(response);
        } else if(request.url.match(/.png$/)){
            var imagePath = path.join(__dirname, 'public', request.url);
            var imageStream = fs.createReadStream(imagePath);
            response.writeHead(200, {'Content-Type':'image/png'});
            imageStream.pipe(response);
        } else if(request.url === '/allProducts') {
            response.writeHead(200, {'Content-Type': 'text/json'})
            response.end(JSON.stringify(data))
        }
    } else if(request.method === 'POST') {
        if (request.url === '/formSubmit') {
            console.log(request);

            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('the form was submitted');

            var body = ''
            request.on('data', function(data){
              body += data;

            })

            request.on('end', function(){
              var formData = qs.parse(body);
              console.log();
            })
        }
    } // GET/POST IF STATEMENT ENDS
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

function inStock(response){
  var stock = data.filter(function(){
    return item.inStock === true;
  });
  response.end(JSON.stringify(stock))
}
