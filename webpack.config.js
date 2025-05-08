const fs = require("fs");
 
module.exports = {
    mode: "development",
 
    
 
    output:{
        filename: "main.js",
        clean: true
    },
 
    module:{
        rules:[
            {
                test: /\.css$/,
                use: "./text_loader.js"
            }
        ]
    },
 
    plugins: [
 
        {          
            apply: function(compiler)
            {
                compiler.hooks.done.tap("MyPlugin", _=>{
                    let code = fs.readFileSync("dist/main.js","utf-8");
                    let html = fs.readFileSync("src/index.html","utf-8");
                    let result = html.replace("<script src=\"main.js\"></script>", _=>`<script>\n ${code} \n</script>`);
                    fs.writeFileSync("dist/index.html",result);
                })
            }
        }
    ]
}