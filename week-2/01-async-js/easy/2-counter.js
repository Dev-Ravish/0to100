let count = 0;

function counter(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(count+1);
        }, 1000);
        
    })
    
}

async function printCounter(){
    while(true){
        count = await counter();
        console.log(count);
    }
}


printCounter();