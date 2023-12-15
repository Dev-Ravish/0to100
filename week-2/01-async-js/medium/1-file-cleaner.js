const fs = require('fs')

function removeSpace(){
    return new Promise(function(resolve){
        fs.readFile('a.txt', 'UTF-8', function(errr, data){
            console.log(data);
            fs.open('a.txt', 'w+', function(err, fd){
                console.log(fd);
                data=data.split(' ').filter((value)=>{
                    if(value!=' '){
                        return value;
                    }
                }).join(' ');
                fs.write(fd, data, function(err, wd){
                    resolve(data);
                })
            })
        });
        
    })
}


async function fileCleaner(){
    const data = await removeSpace();
    console.log(data);
}

fileCleaner();