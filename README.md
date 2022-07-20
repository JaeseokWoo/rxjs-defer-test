# 직접 실행해보면서 RxJS defer()와 from() 비교

RxJS의 defer()와 from() 생성 함수로 만들어진 Observable의 동작을 비교하기 위한 Repository

## server

error를 반환하는 라우터

```js
app.get("/error", (req, res) => {
  const { rxjsFunc } = req.query;
  console.log(`requested GET /error?rxjsFunc=${rxjsFunc}`);
  res.status(400).send("error");
});
```

## client

```js
console.log("### defer 생성 함수 호출 ###");
defer(() => axios(deferRequestOption))
  .pipe(retry(2))
  .subscribe({
    next: (value) => console.log(`defer next: ${value}`),
    error: (error) => console.log(`defer error: ${error}`),
    complete: () => console.log("defer complete"),
  });

setTimeout(() => {
  // 4초 뒤에 from Observable 실행
  console.log("### from 생성 함수 호출 ###");
  from(axios(fromRequestOption))
    .pipe(retry(2))
    .subscribe({
      next: (value) => console.log(`from next: ${value}`),
      error: (error) => console.log(`from error: ${error}`),
      complete: () => console.log("from complete"),
    });
}, 4000);
```

## 실행 결과

### server

```
requested GET /error?rxjsFunc=defer
requested GET /error?rxjsFunc=defer
requested GET /error?rxjsFunc=defer
requested GET /error?rxjsFunc=from
```

### client

```
### defer 생성 함수 호출 ###
defer error: AxiosError: Request failed with status code 400
### from 생성 함수 호출 ###
from error: AxiosError: Request failed with status code 400
```

from()으로 생성된 Observable은 retry(2)를 해도 서버로 요청을 다시 하지 않는 것을 알 수 있다.
반면에 defer()로 생성된 Observable은 retry(2) 만큼 서버로 요청을 보내느 것을 알 수 있다.
