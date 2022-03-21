const exp = require("express");
const bodyparser = require("body-parser");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");

const app = exp();

//mongoose.connect("mongodb+srv://admin:ga3O0hN1h41MShOv@cluster0.pccp8.mongodb.net/database1?retryWrites=true&w=majority");

var db1 = mongoose.createConnection("mongodb+srv://admin:ga3O0hN1h41MShOv@cluster0.pccp8.mongodb.net/database1?retryWrites=true&w=majority");


var db2 = mongoose.createConnection("mongodb+srv://admin:ga3O0hN1h41MShOv@cluster0.pccp8.mongodb.net/database1?retryWrites=true&w=majority");

app.use(bodyparser.urlencoded({ extended: true }));
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");


const customers_schema = new mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "email": String
}, { strict: true });

const customers = db1.model("customers4", customers_schema);
/*
let c1 = new customers({
    first_name: "Haytham",
    last_name: "Qushtom",
    email: "ddddd@dddd.com"
}).save((e, data) => {
    if (e)
        console.log(e);
    else
        console.log(data);
});*/

app.get("/", function (req, res) {
    res.render("home", { layout: false });
});

app.get("/customer_detail/:id", function (req, res) {
    let cusID = req.params.id;

    customers.find({ customerID: cusID }).exec().then((data) => {
        res.render("customer_detail", { data: data, layout: false });
    })

});

app.get("/delete_customer/:id", function (req, res) {
    let cusID = req.params.id;
    //customers.deleteMany();
    customers.deleteOne({ customerID: cusID });
});

app.post("/update_customer", function (req, res) {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let cusID = req.body.cusID;

    //  customers.updateMany()
    customers.updateOne(
        { customerID: cusID },
        {
            $set: {
                first_name: fname,
                last_name: lname
            }
        }

    ).exec().then((data) => {
        console.log(data);
        res.render("customer_detail", { data: data, layout: false });
    });

});

app.post("/search", function (req, res) {
    let fname = req.body.fname;
    let lname = req.body.lname;

    if (fname && lname) {
        customers.find({ first_name: fname, last_name: lname }, ["first_name", "last_name"]).exec().then((data) => {
            console.log(data);
            res.render("Home", { data: data, layout: false });
        });

    } else if (fname && !lname) {
        customers.find({ first_name: fname }).exec().then((data) => {
            res.render("Home", { data: data, layout: false })
        });

    } else if (!fname && lname) {
        customers.find({ last_name: lname }).exec().then((data) => {
            res.render("Home", { data: data, layout: false })
        });

    }
});


/*
SQL: select * from students;

customers.find() 
--------------------------
SQL: select * from students where fname="Haytham";

customers.find({fname:"Haytham"}) 

----------------------------
SQL: select lname from students where fname="Haytham";

customers.find({fname:"Haytham"},["lname"])

-------------------------------------------------
SQL: select * from students where fname="Haytham" and lname="Qushtom"

customers.find({fname:"Haytham",lname:"Qushtom"})

-------------------------------------
SQL select * from students where fname="Haytham" or fname="Maria";

customers.find(
    {
    $or:[
        {fname:"Haytham"}, 
        {fname:"Maria"}
    ]
    })

------------------------------------
SQL: select * from sudents 
     where fname = "Haytham" and (lname="Qushtom" or lname="Alex");

     customers.find({fname:"Haytham",$or:[{lname="Qushtom"},{lname="Alex"}] }
    */








const port = process.env.PORT || 8080;
app.listen(port);




