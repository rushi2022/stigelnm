const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
var bodyparser = require("body-parser");
require("dotenv").config();
require("./conn");

const Register = require("./models/registers");
const jsonparser = bodyparser.json();

const port = process.env.PORT || 5000;
const path = require("path");
const { json } = require("express/lib/response");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("SecretStringForCoockies"));

app.use(
  session({
    secret: "SecretStringForCoockies",
    cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());
const urlcodedparser = bodyparser.urlencoded({ extended: false });

let userdata = {};
let sucess = "th";
let isTrue= false;
module.exports = userdata;
let totalData=[];
let inTheData=false ;
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login", { userdata, sucess: sucess });
});
app.get("/register", function (req, res) {
  res.render("register",{userdata,inTheData});
});

//creat new user
app.post("/register", urlcodedparser, async function (req, res) {
  try {
    await Register.find().then((result) => {
   totalData= result.slice();
})

 totalData.forEach(result=>{
  if(result.email===req.body.email){
    inTheData=true
  }else{
    inTheData=false;
  }
})

if(inTheData){
res.status(201).redirect("/register");
}else{
  const registerdCoustermer =  new Register({
    fullname: req.body.fullname,
    email: req.body.email,
    age: req.body.age,
    adress: req.body.adress,
    password: req.body.password,
    isTrue:false
  });

  const registerd = registerdCoustermer.save();
  let user = {
    fullname: req.body.fullname,
    email: req.body.email,
    age: req.body.age,
    adress: req.body.adress,
    password: req.body.password,
    isTrue:false
  };
  userdata = user;
  res.status(201).redirect("/coursePage");
}
  
    
  } catch(eroor) {
    res.status(400).send(eroor);
  }
});

app.post("/login", urlcodedparser, async function (req, res) {
  await Register.find({ email: req.body.email })
    .then((result) => {
      userdata = result[0];
      if (userdata.password == req.body.password) {
        res.status(200).redirect("/coursePage");
        sucess = "not error";
       isTrue=userdata.isTrue;
      } else {
        sucess = "";
        res.redirect("/login");
      }
    })
    .catch((error) => {
      res.redirect("/profileNotFound");
    });
});
app.get("/coursePage", function (req, res) {
  if(!userdata){
    res.render('index');
  }else{
     res.render("coursePage", { userdata });
  }
 
});

app.get("/profile", function (req, res) {
 
     res.render("profile", { userdata }); 
  

});
app.get("/profileNotFound", function (req, res) {
  res.render("profileNotFound");
});
app.get('/deshbord',function(req,res){
  
res.render('deshbord',{userdata:userdata,isTrue:isTrue})

})
app.get("/markAsRead", async function(req,res){
userdata.isTrue=true;
isTrue=true;
try{
 await Register.updateOne({email:userdata.email},{$set:{
    isTrue:true
  }})
  console.log(userdata);
    res.redirect("/deshbord");

}catch(err){
console.log(err);
}
  
});
app.get('/logout',function(req,res){
  userdata={};
  sucess = "th";
  isTrue=false;
  res.render('index');
})

app.get("*", function (req, res) {
  res.render("404");
});
app.listen(port, () => {
  console.log("hello");
});
