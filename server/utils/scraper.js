// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

//import convert.js when price is EUR
const { cashify } = require('./convert')
//import format function
const { numberWithCommas, parseFloatIgnoreCommas } = require('./format')

async function scrapeCoinbase() {
    const exchange = "Coinbase"
    const url = "https://www.coinbase.com"
    console.log("Coinbase loading...")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    console.log('Results from Coinbase coming soon');

    //Scrape BTC price
    const [btcPriceEl] = await page.$x('//*[@id="root"]/div/div[2]/section/div/table/tbody/tr[1]/td[3]/div/h4[1]');
    let btcPriceContent = await btcPriceEl.getProperty('textContent');
    let btcPrice = await btcPriceContent.jsonValue()
    // Basic parsing
    btcPrice = cashify.convert(`${btcPrice} EUR`, {to: 'USD'});
    //round to 2 decimal
    btcPrice = btcPrice.toFixed(2)
    //format to number with commas
    btcPrice = numberWithCommas(btcPrice)

    //Scrape ETh Price
    const [ethPriceEl] = await page.$x('//*[@id="root"]/div/div[2]/section/div/table/tbody/tr[2]/td[3]/div/h4[1]');
    let ethPriceContent = await ethPriceEl.getProperty('textContent');
    let ethPrice = await ethPriceContent.jsonValue()
    // Basic parsing
    ethPrice = cashify.convert(`${ethPrice} EUR`, {to: 'USD'});
    //round to 2 decimal
    ethPrice = ethPrice.toFixed(2)
    //format to number with commas
    ethPrice = numberWithCommas(ethPrice)

    console.log(btcPrice , ethPrice, exchange, url);

    browser.close()

    return {btcPrice, ethPrice, exchange, url}

}

async function scrapeKraken() {
    const exchange = "Kraken"
    const url = "https://www.kraken.com/prices?quote=USD"
    console.log("Kraken loading...")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    console.log('Results from kraken coming soon');

    //Scrape BTC price
    const [btcPriceEl] = await page.$x('//*[@id="react-container"]/div/div/div[2]/div/table/tbody/tr[1]/td[3]/span');
    let btcPriceContent = await btcPriceEl.getProperty('textContent');
    let btcPrice = await btcPriceContent.jsonValue()
    btcPrice = parseFloatIgnoreCommas(btcPrice)
    //round to 2 decimal
    btcPrice = btcPrice.toFixed(2)
    btcPrice = numberWithCommas(btcPrice)

    //Scrape ETh Price
    const [ethPriceEl] = await page.$x('//*[@id="react-container"]/div/div/div[2]/div/table/tbody/tr[2]/td[3]/span');
    let ethPriceContent = await ethPriceEl.getProperty('textContent');
    let ethPrice = await ethPriceContent.jsonValue()

    ethPrice = parseFloatIgnoreCommas(ethPrice)
    //round to 2 decimal
    ethPrice = ethPrice.toFixed(2)
    ethPrice = numberWithCommas(ethPrice)

    console.log(btcPrice , ethPrice, exchange, url);

    browser.close()

    return {btcPrice, ethPrice, exchange, url}

}

async function scrapeBinance() {
    const exchange = "Binance"
    const url = "https://www.binance.com/en"
    console.log("Binance loading...")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    console.log('Results from Binance coming soon');

    //Scrape BTC price
    const [btcPriceEl] = await page.$x('//*[@id="__APP"]/div/main/div[4]/div/div/a[2]/div[2]');
    let btcPriceContent = await btcPriceEl.getProperty('textContent');
    let btcPrice = await btcPriceContent.jsonValue()
    // Basic parsing
    btcPrice = cashify.convert(`${btcPrice} EUR`, {to: 'USD'});
    //round to 2 decimal
    btcPrice = btcPrice.toFixed(2)
    //format to number with commas
    btcPrice = numberWithCommas(btcPrice)

    //Scrape ETh Price
    const [ethPriceEl] = await page.$x('//*[@id="__APP"]/div/main/div[4]/div/div/a[3]/div[2]');
    let ethPriceContent = await ethPriceEl.getProperty('textContent');
    let ethPrice = await ethPriceContent.jsonValue()
    // Basic parsing
    ethPrice = cashify.convert(`${ethPrice} EUR`, {to: 'USD'});
    //round to 2 decimal
    ethPrice = ethPrice.toFixed(2)
    //format to number with commas
    ethPrice = numberWithCommas(ethPrice)

    console.log(btcPrice , ethPrice, exchange, url);

    browser.close()

    return {btcPrice, ethPrice, exchange, url}
}

module.exports = {
    scrapeCoinbase,
    scrapeKraken,
    scrapeBinance,
}