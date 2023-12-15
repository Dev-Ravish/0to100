
setInterval(function(){
    const date = new Date();
    console.log(date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}));
    console.log(date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit', hour12:false}));
}, 1000);