const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const url = require('url');
const mysql = require('mysql');
const template = require('./lib/template.js');
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'********',
    database:'todolist',
    port:3307
});
db.connect();
const app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url, true).query;
    let pathname = url.parse(_url, true).pathname;
    //read
    if(pathname == '/'){
        fs.readFile(__dirname + '/public/script/script.js','utf8', (err, script) => {
            if(err) throw err;
            fs.readFile(__dirname + '/public/css/style.css','utf8', function (err2, style) {
                if(err2) throw err2;
                db.query('select * from todo',(err3, result) => {
                    if(err3) throw err3;
                    let list = template.list(result);
                    let html = template.html(style, list, script);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        });
    }else if(pathname === "/create_process"){
        let body = '';
        request.on('data',(data) => {
            body = body + data;
        });
        request.on('end',() => {
            let post = qs.parse(body);
            if(post.text == ''){
                response.writeHead(302, {Location:`/`});
                response.end("success");
            }else{
                db.query('INSERT INTO todo (description,created) VALUES(?,now())',[post.text],function(err,results){
                    if(err) throw err;
                    response.writeHead(302, {Location:`/`});
                    response.end("success");
                });
            }
    });
    }else if(pathname === "/delete_process"){
        let body = '';
        request.on('data',(data) => {
            body = body + data;
        });
        request.on('end',() => {
            let post = qs.parse(body);
            console.log(post);
            db.query('DELETE FROM todo WHERE id=?',[post.id],function(err){
                if(err) throw err;
                response.writeHead(302, {Location:`/`});
                response.end("success");
        });
    });
    }else{
        response.writeHead(404);
        response.end("not found");
    }
});
app.listen(3000);