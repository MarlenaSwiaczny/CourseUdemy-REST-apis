import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


const yourBearerToken = "087fef4e-fba3-4ba1-91bc-ec8411f6d887";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  console.log(req.body)
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    console.log(result.data)
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log(error.response.data)
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});


app.post("/post-secret", async (req, res) => {

  console.log(req.body);
  const data = {
    secret: req.body.secret,
    score: req.body.score
  }
 
  try {
    const result = await axios.post(API_URL + "/secrets", data, config);
    console.log(result.data)
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log(error.response.data)
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const data = {
    secret: req.body.secret,
    score: req.body.score
  }
 
  try {
    const result = await axios.put(API_URL + "/secrets/" + id, data, config);
    console.log(result.data)
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log(error.response.data)
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  console.log(req.body);
  const id = req.body.id;
  const data = {
    secret: req.body.secret,
    score: req.body.score
  }
 
  try {
    const result = await axios.patch(API_URL + "/secrets/" + id, data, config);
    console.log(result.data)
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log(error.response.data)
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});


app.post("/delete-secret", async (req, res) => {
  const id = req.body.id;

  console.log(req.body);
 
  try {
    const result = await axios.delete(API_URL + "/secrets/" + id, config);
    console.log(result.data)
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log(error.response.data)
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
