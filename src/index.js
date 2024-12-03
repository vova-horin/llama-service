const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.static("./public"));

app.get("/chat", (req, res) => {
  axios
    .post("http://localhost:11434/api/chat", {
      model: "atate",
      messages: [
        {
          role: "user",
          content: req.query.message,
        },
      ],
      stream: false,
    })
    .then((response) => {
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
