var http = require('http');
let url = require("url");
let fs = require("fs");

http.createServer(function (req, res) {
    //允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader("X-Powered-By", "3.2.1");

    res.writeHead(200, {'Content-Type': 'text/plain;charset="utf-8"'});
    if(req.url !== "/favicon.ico"){
        console.log(url.parse(req.url, true));
        let path = url.parse(req.url, true).path;
        fs.readFile("." + path, (err, data)=>{
            if(err){
                console.log(err);
                res.end("not found11");
                return;
            }else{
                console.log(data);
                res.end(data);
            }
        })
    }
    else
        res.end('Hello World');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/test.jpg');