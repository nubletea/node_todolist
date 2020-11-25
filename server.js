const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const url = require('url');
const mysql = require('mysql');
const template = require('./lib/template.js');
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'*********',
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
        if(queryData.id === undefined){
                // fs.readFile(__dirname + '/public/css/style.css','utf8', function (err, data) {
                // fs.readdir('./data',(err, filelist) => {
                //     let list = template.list(filelist);
                //     let html = template.html(data, list);
                //     response.writeHead(200);
                //     response.end(html);
                // });
            // });
            fs.readFile(__dirname + '/public/css/style.css','utf8', function (err, data) {
                db.query('select * from todo',(err, result) => {
                    if(err) throw err;
                    let list = template.list(result);
                    let html = template.html(data, list);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }else{
            fs.readFile(__dirname + '/public/css/style.css','utf8', function (err, data) {
                db.query('select * from todo',(err, result) => {
                    if(err) throw err;
                    let list = template.list(result);
                    let html = template.html(data, list);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    }else if(pathname === "/create_process"){
        let body = '';
        request.on('data',(data) => {
            body = body + data;
        });
        request.on('end',() => {
            let post = qs.parse(body);
            db.query('INSERT INTO todo (description,created) VALUES(?,now())',[post.text],function(err,results){
                if(err) throw err;
                response.writeHead(302, {Location:`/`});
                response.end("success");
        });
    });
    }else if(pathname === "/delete_process"){
        let body = '';
        request.on('data',(data) => {
            body = body + data;
        });
        request.on('end',() => {
            let post = qs.parse(body);
            console.log(post);
            db.query('DELETE FROM todo WHERE id=?',[post.id],function(err,results){
                if(err) throw err;
                response.writeHead(302, {Location:`/`});
                response.end("success");
        });
    });
    }else{
        response.writeHead(404);
        response.end("not found");
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
});
app.listen(3000);