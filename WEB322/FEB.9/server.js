const exp= require("express");
const { stat } = require("fs");
const app =exp();
const path=require("path");
const bodyparser=require("body-parser");


// to be able to access to statice file ->  image /js/ css file
app.use(exp.static("public")); 

//help us to reach the body of the message
app.use(bodyparser.urlencoded({extended:false}));


//HTTP METHOD => GET : http://localhost:8080/
app.get("/",function(req,res){
res.sendFile(path.join(__dirname,"public/html/home.html"));
});

// 3 routing functions
//HTTP METHOD => GET : http://localhost:8080/login
app.get("/login",function(req,res){
    res.sendFile(path.join(__dirname,"public/html/login.html"));
});

//HTTP METHOD => GET : http://localhost:8080/dashboard
app.get("/dashboard",function(req,res){
    res.sendFile(path.join(__dirname,"public/html/dashboard.html"));
});

//HTTP METHOD => GET: http://localhost:8080/search?namroftheelement
//HTTP METHOD => GET: http://localhost:8080/search?s=


//HTTP METHOD =? GET: HTTP://localhost:8080/search?
app.get("/search",function(req,res){
    let searchKW = req.query.s;
    console.log("The keyword is: " + searchKW);
    res.send("The keyword is: " + searchKW);
});

//HTTP METHOD => POST http://localhost:8080/login
//username
//password
app.post("/login_request",function(req,res){
let username=req.body.username;
let password=req.body.password;

console.log("The username and the password is: ");
console.log(username +" " + password);
res.send("The username and the password is : " + username +" " +password);
});



app.use(function(req,res){  //middle wear
    res.status(404).sendFile("path".join(__dirname,"public/html/pagenotfound.html"));
  });




const port = process.env.PORT||8080;
app.listen(port);
