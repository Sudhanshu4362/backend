//creating server with node.js

//http module
const http = require("http")
const fs = require("fs");
const _= require('lodash')
const server = http.createServer((req,res) => {
    console.log("request from browser to server");
    // console.log("123",JSON.stringify(req));
    console.log(req.method);
    console.log(req.url);
    res.setHeader('Content-Type','text/html');

    let greet = _.once(() => {
        console.log("how are you");
    })
    greet();
    greet();
    // res.write("<h1>Hello World</h1>");
    // res.end("<h3>Testing res.end</h3?");
    let path = './views';
    switch(req.url) {
        case '/':
            path += '/index.html'
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html'
            res.statusCode = 200;
            break;
            case '/aboutus':
                res.statusCode = 301
                res.setHeader('location','/about')
                res.end();
                break;
        default:
            path += '/404.html'
            res.statusCode = 404;
            break;
    }
    fs.readFile(path, (err, file) => {
        if (err) {
            console.log(err);
        }
        else {
            res.write(file);
            res.end();
        }
    })
})

server.listen(3001,'localhost',() => {
    console.log('server is listinig on port 3001');
})