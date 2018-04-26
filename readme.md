
### Install & run
```sh
cp config.json.template config.json
vi config.json


yarn
yarn dev
```

### Allow-Control-Allow-Origin
- https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
- 設定 "localhost" 及可

### 遶過 Allow-Control-Allow-Origin 無法跨過 port 的暫時方案
```
假設環境
    project path     : https://localhost/page/
    webpack dev path : https://localhost:8080/

在你開發的頁面
    https://localhost/page/

加入以下網址及可
  <script src="http://localhost:35729/livereload.js"></script>
  <script src="https://localhost:8080/public/dist/app.js"></script>
```


