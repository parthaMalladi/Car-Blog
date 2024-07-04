// module imports
import express from "express";
import bodyParser from "body-parser";

// housekeeping
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// home page
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// view page
app.get("/submit", (req, res) => {
    res.render("index.ejs", {
        content: mem
    });
});

var mem = [];

// submit page and delete post
app.post("/submit", (req, res) => {
    if (req.body["title"].length > 0 && req.body["msg"].length > 0) {
        mem.push([req.body["title"], req.body["msg"], mem.length]);
    }

    if (req.body["deletePost"] == "true") {
        mem.splice(req.body["postIndex"], 1);
    }

    res.render("index.ejs", {
        content: mem
    });
});

// about page
app.get("/about", (req, res) => {
    res.render("about.ejs");
});

// check server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  