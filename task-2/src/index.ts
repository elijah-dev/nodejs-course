import express from "express";

const port = 3333;
const app = express();

app.get("*", (_, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
