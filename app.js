//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://PoojanThaker:passpass123@cluster0.tntja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true});

const tasksSchema = {
  name: String
}

const Task = mongoose.model("Task", tasksSchema);

// const task1 = new Task({
//   name: "Coding"
// });

// const task2 = new Task({
//   name: "WebD"
// });

// const task3 = new Task({
//   name: "Leetcode"
// });

// var alltasks = [task1, task2, task3];
var alltasks = [];

// Task.insertMany(alltasks, function(err) {
//   if(err)
//     console.log(err);
//   else
//     console.log("task success");
// });

// Task.find({},function(err, results){
//   if(err)
//     console.log(err);
//   else {
//     alltasks = results;
//     console.log(results);
//   }
// })

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  Task.find({},function(err, results){
    if(err)
      console.log(err);
    else {
      alltasks=results;
      console.log(results);
    }
  });
  res.render("list", {listTitle: "Today", newListItems: alltasks});
});

app.post("/", function(req, res){

  const taskName = req.body.newItem;

  const newtask = new Task({
    name: taskName
  });
  
  newtask.save();

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
    res.redirect("/");
  // }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
