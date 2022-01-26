
const exp = require("express");
const app = exp();
const path=require("path");

// http://www.web322.ca:80


app.get("/",(req,res)=>{    //request and respond, http://localhost:8080/
     console.log("first get fucntion");
    // res.send("Home page");
    res.sendFile(path.join(__dirname,"/home.html"));
});//fuction,can handle request that came from client use get as http method

//http://localhost:8080/about_us
app.get("/about_us",(req,res)=>{
    console.log("Aout us fuction");
    res.sendFile(path.join(__dirname,"/about.html"));
});
const port=process.env.PORT || 8080;
//LISTNING TO THE COMMUMICATIONㅇ
app.listen(port);
