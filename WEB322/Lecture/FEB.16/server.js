const exp = require("express");
const app = exp();
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

app.use(exp.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

let multer_conf = multer.diskStorage({
    destination: "./public/img",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage:multer_conf});

//const upload = multer({ dest: "./public/img" });


/*
function funA(req, res, next) {
    console.log("funA");
    next();
}

app.get("/test", funA, funB, funC, function (req, res) {

});*/

// HTTP METHOD => GET : http://localhost:8080/
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/html/home.html"));
});

// HTTP METHOD => GET : http://localhost:8080/login
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "public/html/login.html"));
});

//HTTP METHOD => GET: http://localhost:8080/dashboard
app.get("/dashboard", function (req, res) {
    res.sendFile(path.join(__dirname, "public/html/dashboard.html"));
});

//HTTP METHOD => GET: 
//   http://localhost:8080/search?s=car&key=value 
app.get("/search", function (req, res) {
    let searchKW = req.query.s;
    let submit = req.query.submit;

    console.log("The keyword is:" + searchKW);
    res.send("The keyword is:" + searchKW);
});


//HTTP METHOD => POST  http://localhost:8080/login
// username 
// password
app.post("/login_request", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    console.log("The username and the password is:");
    console.log(username + " " + password);
    res.send("The username and the password is:" + username + " " + password);
});

//HTTP METHOD => POST http://localhost:8080/update_profile

app.post("/update_profile", upload.single("img"), function (req, res) {
    let username = req.body.username;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;

    let img = req.file;

    console.log(req.body);
    console.log(img);

   res.send("This image is uploaded for "+ username + ": <img src='./img/"+img.filename +"' />");
});

app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname, "public/html/pagenotfound.html"));
});


const port = process.env.PORT || 8080;
app.listen(port);
