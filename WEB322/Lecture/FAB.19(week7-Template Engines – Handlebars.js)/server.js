const exp = require("express");
const app = exp();
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.engine(".hbs", handlebars.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Home (index) page (view)
app.get("/", function (req, res) {
    res.render("home",
        { msg: "Haytham Qushtom", layout: false });
});

app.get("/login", function (req, res) {
    res.render("login",
        { msg: "", layout: false });
});

app.post("/login_submit", function (req, res) {

    let resObj = {
        username: req.body.username,
        password: req.body.password,
        FormSubmited: req.body.submit,
        msg: ""
    };

    if (resObj.password && resObj.username) {
        resObj.msg = "";
    } else {
        resObj.msg = "The username or password is incorrect";
    }

    res.render("login", { resObj: resObj, layout: false });
});

app.get("/products", function (req, res) {

});

app.get("/product/:id", function (req, res) {

});



const port = process.env.PORT || 8080;
app.listen(port);
