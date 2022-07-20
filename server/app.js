const express = require("express");

const app = express();
app.set("port", process.env.PORT || 8010);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/success", (req, res) => {
  console.log("requested GET /success");
  res.send("success");
});

app.get("/error", (req, res) => {
  const { rxjsFunc } = req.query;
  console.log(`requested GET /error?rxjsFunc=${rxjsFunc}`);
  res.status(400).send("error");
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
