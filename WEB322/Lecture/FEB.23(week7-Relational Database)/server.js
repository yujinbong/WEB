const exp = require("express");
const app = exp();
const sequelize = require("sequelize");

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
    "customers1",
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


seq_obj.sync().then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port);
});

