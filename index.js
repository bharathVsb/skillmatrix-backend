const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password:"",
    database: "userdata"
});

app.post("/login",(req,res)=> {
    const username = req.body.username;
    const password = req.body.password;



    db.query(
        "INSERT INTO users (username,password) VALUES (?,?)",
        [username,password],
        (err,result) => {
            if (err) {
                console.log(err);
            }else {
                res.send("Values Inserted");
            }
        }
    )
})

app.post("/userform",(req,res)=> {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const empid = req.body.empid;
    const html = req.body.html;
    const css = req.body.css;
    const js= req.body.js;
    const reactjs = req.body.reactjs;
    const nodejs = req.body.nodejs;
    const sqlskill = req.body.sql;

    db.query(
        "INSERT INTO skillset (firstname,lastname,empid,html,css,js,reactjs,nodejs,sqlskill) VALUES (?,?,?,?,?,?,?,?,?)",
        [firstname,lastname,empid,html,css,js,reactjs,nodejs,sqlskill],
        (err,result) => {
            if (err) {
                console.log(err);
            }else {
                res.send("Values Inserted");
            }
        }
    )
})

app.get("/getusers", (req, res) => {
    db.query("SELECT * FROM skillset", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
app.get("/userlogin", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001,()=> {
    console.log("server connected");
})