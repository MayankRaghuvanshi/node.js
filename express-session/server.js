const express = require('express')
const session = require('express-session')
const  srv = express()
const db=require('./db').user



srv.use(express.json())
srv.use(express.urlencoded({
    extended : true
}))


srv.use('/',express.static(__dirname + '/public/'))
srv.post('/',(req,res)=>{
    db.create({
        email: req.body.email,
        password: req.body.password
    }).then((data)=>{
        res.redirect('/login')
    })
})

srv.post('/login',(req , res)=>{
    db.findOne({ where:{email:req.body.email}}).then((data)=>{
        if(!data){
            res.send("not exist")
        }
        if(data.email===req.body.email){
            req.session.data=data.email;
            res.redirect('/login')
        }
        else{
            res.send("success")
        }
    })})

srv.get('/login',(req,res)=> {
    if (req.session.data) {
        let x =req.session.data;
        res.send(x)
    }else {
        res.redirect('/login.html')
    }
})


srv.get("/check",(req,res)=>{
    if(req.session.data){
        res.send("still loged")
    }
    else{
        res.redirect('/login.html')
    }
})

srv.get('/server',(req,res)=>{
    res.send("Server is running")

})





srv.listen(1221,()=>{
    console.log("http://localhost:1221/index.html")
    console.log('http://localhost:1221/login.html')
})