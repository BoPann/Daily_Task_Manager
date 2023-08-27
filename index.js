import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const allItems = [];
var nums = 0;

app.get("/", (req, res) => {
  res.render("index.ejs", {itemList: allItems,
                              num: nums}); 
  });

app.post("/submit", (req, res) => {
  nums++;
  const newItem = req.body.item;
  allItems.push(newItem);
  res.render("index.ejs", {itemList: allItems,
    num: nums});
  
});


app.post("/remove", (req, res) => {
  const index = req.body.targetItem;
  nums--;
  allItems.splice(index,1);
  res.redirect("/");
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
