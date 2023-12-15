const fs = require("fs");


function read(){
    return new Promise(function(resolve){
        fs.readFile('read.txt', 'UTF-8', function(err,data){
            data+='hellooooooooooooooooo\n';
            fs.open('read.txt', 'w+',function(err, fd){
                fs.write(fd, 'hello', function(err, wb){
                    setTimeout(function(){
                        resolve(wb + 'bytes written');
                    }, 1000);
                });
            })
            
        })
    })
}

async function reading(){
    const p=await read();
    console.log(p);
}

reading();