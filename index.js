import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const allItems = [];

app.get("/", (req, res) => {
  res.render("index.ejs", {itemList: allItems}); 
  });

app.post("/submit", (req, res) => {
  const newItem = req.body.item;
  allItems.push(newItem);
  res.render("index.ejs", {itemList: allItems});
  
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
