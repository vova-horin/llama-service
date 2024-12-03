const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.static("./public"));

app.use(express.json());

const history = {};

app.post("/chat", (req, res) => {
  console.log(req.body.message);

  const userHistory = history[req.body.id] ? history[req.body.id] : [];

  userHistory.push({
    role: "user",
    content: req.body.message,
  });

  axios
    .post("http://localhost:11434/api/chat", {
      model: "atate",
      messages: history,
      stream: false,
    })
    .then((response) => {
      userHistory.push(response.data.message);

      history[req.body.id] = userHistory;

      res.send(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
