const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static("public"));

app.set("view engine", "ejs");
var iteams = [];
var newItems = [];
app.get("/", function (req, res) {
    var current = new Date();
    var day = new Date();
    var Option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = current.toLocaleDateString(("en-US"), Option);
    res.render("list", {
        whichDay: day,
        toDo: iteams
    });
});
// below is the work page(to understand multilevel pages)
app.get("/work", function (req, res) {
    let workList = "work list"
    res.render("list", {
        whichDay: workList,
        toDo: newItems
    });
});

// the below about is used for to knw the working of layout(ie header and footer)
app.get("/about", function(req, res){
    res.render("about");
});

// app.post("/work", function (req, res) {

// });

app.post("/", function (req, res) {
     let iteam = req.body.add;

    if (req.body.items == "work list") {
        newItems.push(iteam);
        res.redirect("/work");
    } else {
        iteams.push(iteam);
        res.redirect("/");
    }
});


app.listen(5000, function (req, res) {
    console.log("running successfully")
});