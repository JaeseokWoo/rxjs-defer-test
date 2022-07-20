const { from, retry, defer } = require("rxjs");
const axios = require("axios");

const SERVER_URL = "http://localhost:8010";

const deferRequestOption = {
  method: "get",
  url: `${SERVER_URL}/error?rxjsFunc=defer`,
};
const fromRequestOption = {
  method: "get",
  url: `${SERVER_URL}/error?rxjsFunc=from`,
};

console.log("### defer 생성 함수 호출 ###");
defer(() => axios(deferRequestOption))
  .pipe(retry(2))
  .subscribe({
    next: (value) => console.log(`defer next: ${value}`),
    error: (error) => console.log(`defer error: ${error}`),
    complete: () => console.log("defer complete"),
  });

setTimeout(() => {
  console.log("### from 생성 함수 호출 ###");
  from(axios(fromRequestOption))
    .pipe(retry(2))
    .subscribe({
      next: (value) => console.log(`from next: ${value}`),
      error: (error) => console.log(`from error: ${error}`),
      complete: () => console.log("from complete"),
    });
}, 4000);
