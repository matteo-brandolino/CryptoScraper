<h1>CryptoScraper</h1>
<p>A Full Stack Application with MERN stack</p>
<br>
<p>You can scrape the pages of three exchange(Coinbase, Kraken and Binance) in order to discover the price of Bitcoin and Ethereum</p>

<h1>How to run locally</h1>
<p>Change variables in /server/.env</p>

```
MONGOURI=mongodb+srv://<username>:<password>@cluster0.tzo6l.mongodb.net/<db>?retryWrites=true&w=majority
PORT= 5000
JWT_SECRET = "xxx"
SECRET = "xxx"
```

<p>Install packages in server folder</p>

```
cd server
npm install
```

<p>Run Server</p>

```
npm run start
```

<p>Install packages in client folder</p>

```
cd client
npm install
```
<p>Run Frontend</p>

```
npm start
```



