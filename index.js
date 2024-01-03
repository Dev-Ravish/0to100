const express = require('express');
const jwt = require('jsonwebtoken');
const password = "asdf123"

const app = express();

const USERS = [
    {
        name: 'ravish',
        email: 'rav@gmail.com',
        password: '12345'
    },
    {
        name: 'manish',
        email: 'man@gmail.com',
        password: '123456'
    },
    {
        name: 'rav',
        email: 'ravish@gmail.com',
        password: '1235'
    }
]

function verifiedUser(email, pass){
    let verified = false;
    USERS.map((user) => {
        if(user.email == email && user.password === pass){
            verified = true;
        }
    });
    return verified;
    
}
app.use(express.json());

app.post('/signin', function(req, res){
    const email = req.body.email;
    const pass = req.body.password;

    if(!verifiedUser(email, pass)){
        res.status(401).json("USER not found");
        return;
    }

    const token = jwt.sign({username: email}, password);
    return res.json({
        token,
    })

})

app.get('/getUsers', function(req, res){
    try{
        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token, password);
        console.log(decoded);
        const username = decoded.username;

        const result = USERS.filter((user) => {
            if(user.email == username){
                return false;
            }else{
                return true;
            }
        })
        res.status(200).json(result);
    }catch(err){
        res.status(403).json({
            error: "Server Error"
        })
    }
})

app.listen(3000, function(){
    console.log("App is listening to PORT 3000");
})

