var ws = require("nodejs-websocket");

var PORT = 3000;

var server = ws.createServer(function(conn){
  console.log("New  connection");
  conn.on("text", function(str){
    console.log("Received" + str);
    conn.sendText(str)
  })
  conn.on("close", function(code, reason){
    console.log("Connection close");
  })
  conn.on("error", function(err){
    console.log("handle error");
    console.log(err);
  })
}).listen(PORT);

console.log("websocket server is listening on port" + PORT);