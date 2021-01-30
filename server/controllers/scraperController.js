const { scrapeCoinbase, scrapeKraken, scrapeBinance } = require('../utils/scraper')
const moment = require('moment');
const Data = require('../models/Data')

exports.scraper = async (req, res) => {
    console.log(req._body)
    
    if (req._body) {

        let dataFromCoinbase;

        try {
            /* Scraping from Coinbase */
            const coinbaseData = await scrapeCoinbase()
            dataFromCoinbase = await Data(coinbaseData)
            await dataFromCoinbase.save();
        } catch (err) {
            console.log(err)
        }
        
        let dataFromKraken;
        try {
            /* Scraping from Kraken */
            const krakenData = await scrapeKraken()
            dataFromKraken = await Data(krakenData)
            await dataFromKraken.save();
        } catch (err) {
            console.log(err);
        }

        let dataFromBinance;
        try {
            /* Scraping from Binance */
            const binanceData = await scrapeBinance()
            dataFromBinance = await Data(binanceData)
            await dataFromBinance.save();
        } catch (err) {
            console.log(err);
        }

        res.send([dataFromCoinbase, dataFromKraken, dataFromBinance])
}}

exports.history = async (req, res) => {
    try {
        //get data from db
		let data = await Data.find({})
		.limit(50)
        .sort({ created: 'desc' });

        let dataWithConvertedDate = data.map(info=> {
            const obj = {
                _id:info._id, 
                btcPrice:info.btcPrice, 
                ethPrice:info.ethPrice,
                exchange:info.exchange,
                date: moment(info.date).format('DD-MM-YYYY')
            }
            return  obj
        })
		res.send(dataWithConvertedDate);

	} catch (e) {
		console.log(e);
		res.send('/error')
	}
}
