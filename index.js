import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});

//Created Schema
const itemsSchema = new mongoose.Schema({
  name: String
});

// create model
const Item = mongoose.model("Item", itemsSchema);

// count total
const getCount = async () => {
  try {
    const count = await Item.countDocuments();
    return count;
  } catch (err) {
    console.log("Error:", err);
  }
};


app.get("/", async function(req, res) {
  try {
    const foundItems = await Item.find();
    const total = await getCount();
    res.render("index.ejs", {itemList: foundItems, total: total});
  } catch (err) {
    console.log(err);
  }

});

app.post("/submit", (req, res) => {
  const newItem = req.body.item;
  const item = Item ({
    name: newItem
  });

  item.save();

  res.redirect("/");
  
});


app.post("/remove", async (req, res) => {
  try {
    const id = req.body.doneItem;
    await Item.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
