const http = require("http");
const fs = require("fs");
 
const server = http.createServer((req,res)=>fs.createReadStream("dist/index.html").pipe(res))
 
process.stdin.setRawMode(true);
process.stdin.on("data", _=>{
    server.closeAllConnections();
    server.close(err=>
    {
        if(err)
        {
            console.log(err.message);
        }
        process.exit(0);
    })
})
 
server.listen(3000,"localhost");