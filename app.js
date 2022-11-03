const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views"));

mongoose.connect(
  "mongodb+srv://mild:Mild123456789@cluster0.8ov0nma.mongodb.net/?retryWrites=true&w=majority"
);

const visitorSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

/* Create the mongoose Model from the Schema */
const Visitor = mongoose.model("Visitor", visitorSchema);

async function add_count() {
  let visitors = await Visitor.findOne({ name: "localhost" });

  if (visitors == null) {
    const beginCount = new Visitor({
      name: "localhost",
      count: 1,
    });

    beginCount.save();
  } else {
    visitors.count += 1;
    visitors.save();
  }
}

app.get("/", async function (req, res) {
  let visitors = await Visitor.findOne({ name: "localhost" });
  res.render("index", {
    count: visitors.count,
  });
  add_count();
});

app.get("/index", async function (req, res) {
  let visitors = await Visitor.findOne({ name: "localhost" });
  res.render("index", {
    count: visitors.count,
  });
});

app.get("/About", async function (req, res) {
  res.render("About");
});

app.get("/Contact", async function (req, res) {
  res.render("Contact");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

/* ก่อน run server ต้อง ไปที่ terminal พิม npm install express ก่อน
พอ install เส็จแล้วก็ พิม node ตามด้วยชื่อไฟล์ (เช่น node app.js)
เข้า http://localhost:3000/ ก็จะเจอเว็บเรา */

/* https://www.freecodecamp.org/news/how-to-deploy-an-application-to-heroku/
ลิ้งนี้เป็นวิธี host server บน heroku  */

/*   let visitors = await Visitor.findOne({ name: "localhost" });
  res.render("Contact", {
    count: visitors.count,
  }); */