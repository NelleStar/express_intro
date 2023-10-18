const express = require("express");

const app = express();

// To parse http request body on each request:
app.use(express.json()); //For JSON
app.use(express.urlencoded({ extended: true })); //For Form Data

app.get("/", (req, res) => {
  console.log("homepage");
  res.send("<h1>HomePage</h1>");
});

app.get("/dogs", (req, res) => {
  console.log("YOU ASKED FOR THE /DOGS!");
  res.send("<h1>I am a dog! Woof woof!</h1>");
});

app.get("/chickens", (req, res) => {
  res.send("<h1>BOCK BOCK! (get request)</h1>");
});

app.post("/chickens", (req, res) => {
  res.send("<h1>You created a new chicken! (post request)</h1>");
});

const greetings = {
  en: "hello",
  fr: "bonjour",
  ic: "hallo",
  js: "konnichiwa",
};

app.get("/greet/:language", (req, res) => {
  // save the param to a variable
  const lang = req.params.language;
  // find the language in our greetings object
  const greeting = greetings[lang];
  // error handle in case user puts in invalid language
  if (!greeting) return res.send("INVALID LANGUAGE");

  res.send(greeting);
});

// query string request properties
app.get("/search", (req, res) => {
  // destructure and set default values to the params
  const { term = "all", sort = "top" } = req.query;
  return res.send(`SEARCH PAGE! *Term: ${term} *Sort: ${sort}`);
});

// headers request properties
app.get("/show-me-headers", (req, res) => {
  console.log(req.rawHeaders);
  console.log(req.headers);

  res.send(req.headers);
});

app.get("/show-language", (req, res) => {
  const lang = req.headers["accept-language"];
  res.send(`Your lanuage preference is: ${lang}`);
});

// body request properties
app.post("/register", (req, res) => {
  res.send(`Welcome, ${req.body.username}!!!`);
});

app.listen(3000, () => {
  console.log("App on port 3000");
});
