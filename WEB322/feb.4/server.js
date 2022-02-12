const exp= require("express");
const app =exp();
const path=require("path");

// to be able to access to statice file ->  image /js/ css file
//app.use(exp.static("public")); //middle wear function




/*app.use(function(req,res,next){
console.log("A");
next();
});
*/

function newFun(req,res,next){
    console.log("A");
    next();
}
    app.use(newFun);


    app.use(function(req,res,next){
    console.log("B");
    throw new Error("Error message from B fuction");
    next();    
        });
    app.use(function(e,req,res,next){//4 paramiter (error handling)
        console.log("Error: " + e._message);
        next() ; //if i using the middle wear function, I have to use next.
        });

    app.get("/",function(req,res){
        console.log("the first app.get dunction");
        res.sendFile(path.join(__dirname,"/1.html"));
        });

        app.get("/2",function(req,res){
          /*
key:value,
key2:value
}
*/
//json format
            let obj={
                firstname : "Yujin",
                lastname:"bong",
                age:444,
                email:["aso23456@gmail.com","ybong@myseneca.ca"],
                address:[
                        {
                            city : "dddd"
                        },
                        {
                            city :  "wwww"
                        }
            
                ]
            };
           res.json(obj)
            });
//User id의 속성을 req.paramas.name으로 사용할수있다.
//http://localhost:8080/userID/123456 -> get value of 123456
        app.get("/student/:id", function (req,res) {
            var userID=req.params.id;
            console.log("user ID is : " + userID);
            res.end();//If I don't add "end", the loading will continue.
        });

app.use(function(req,res){
res.status(404).sendFile(path.join(__dirname,"/pagenotfound.html"));
});

const port = process.env.PORT||8080;
app.listen(port);
