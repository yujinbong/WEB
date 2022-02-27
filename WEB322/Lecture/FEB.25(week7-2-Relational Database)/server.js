const exp = require("express");
const app = exp();
const sequelize = require("sequelize");
const handlebars = require("express-handlebars");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));

app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

const seq_obj = new sequelize(
    "dekjonc4s3dj7o", //DATABASE NAME
    "fcirpuzvlvhvhu", // USERNAME
    "9525375642ff84c71272ed4641dd615eb6b78b16453d1eeb819f785d3233957c", // PASSWORD
    {
        host: "ec2-52-207-74-100.compute-1.amazonaws.com",
        dialect: 'postgres',
        port: 5432,
        dialectOptions: { ssl: { rejectUnauthorized: false } }
    });

// SQL: create table customers 
const customers = seq_obj.define(
    "customers3",
    {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: sequelize.STRING
        },
        fname: sequelize.STRING,
        lname: sequelize.STRING
    },
    {
        createdAt: false,
        updatedAt: false
    }
);

app.get("/", function (req, res) {
    res.render("home", { layout: false });
});

app.post("/cust_reg", function (req, res) {
    let uname = req.body.username;
    let first_name = req.body.fname;
    let last_name = req.body.lname;

    //SQL: insert into customers (username,fname,lname) values();
    customers.create({
        username: uname,
        fname: first_name,
        lname: last_name
    }).then((obj) => {
        console.log(obj);
        res.redirect("/dashboard");

    });
});

app.post("/update_profile", function (req, res) {
    let CustID = 2;
    let first_name = req.body.fname;
    let last_name = req.body.lname;

    //SQL: update table cust set fname= "ddd" where id=2 and username="fff";
    customers.update({
        fname: first_name,
        lname: last_name
    }, {
        where: {
            id: CustID
        }
    }).then((obj) => {
        res.redirect("/dashboard");
    });

});

app.get("/dashboard", function (req, res) {
    let CustID = 2;

    //SQL: select * from customers;
    // customers.findAll();

    //SQL: select fname,lname from customers;
    /*  customers.findAll({
          attributes: ["fname", "lname"]
      });*/

    //SQL: select fname,lname,username from customers order by fname,lname;
    /*customers.findAll({
        attributes: ["fname", "lname", "username"],
        order: ["fname", "lname"]
    });*/

    //SQL: select fname,lname from customers where id=2;
    customers.findAll({
        attributes: ["fname", "lname", "username"],
        where: {
            id: 2
        }
    }).then((obj) => {
        console.log(obj);
        let data = obj.map(vaule => vaule.dataValues);
        console.log(data);
        res.render("dashboard", { data: data[0], layout: false });
    });

   // res.render("dashboard", { layout: false });
});

app.post("/remove_cust", function (req, res) {
    let CustID = req.body.id;
    customers.destroy({
        where: {
            id: CustID
        }
    }).then((obj) => {
        res.redirect("/dashboard");
    });
});


seq_obj.sync().then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port);
});
