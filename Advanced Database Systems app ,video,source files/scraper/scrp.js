const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const playwright = require('playwright');

newsUrl = "https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest";
imageUrl = "https://spaceimages-mars.com/";
weatherUrl = "https://twitter.com/marswxreport?lang=en";
factsUrl = "https://space-facts.com/mars/";
astrologyUrl = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars";
const getHtmlPlaywright = async url => { 
	const browser = await playwright.chromium.launch(); 
	const context = await browser.newContext(); 
	const page = await context.newPage(); 
	await page.goto(url); 
	const html = await page.content(); 
	await browser.close(); 
 
	return html; 
}; 
const getHtmlAxios = async url => { 
	const { data } = await axios.get(url); 
 
	return data; 
}; 
async function newData() {
  const texts = [];
  try{
    const para = [];
    const html = await getHtmlPlaywright(newsUrl); 
    const $ = cheerio.load(html);
    const news = $(".item_list");
    const txt = news.find("li");
    txt.each((i, tt) => {
      const item = $(tt).find(".content_title").text();
      const item1 = $(tt).find(".article_teaser_body").text();
      texts.push(item, item1);
    });
    var tit = texts[0];
    var da = texts[1];
    para.push(tit, da);
    // console.log(para);
    return para;
  }catch (err){
    console.error(err)
  }
}
// newData()
async function imageData () {
  const html = await getHtmlPlaywright("https://spaceimages-mars.com/"); 
  var $ = cheerio.load(html);
  const image = $(".floating_text_area");
  const img = image.find("a").attr("href");
  var imUrl = "https://spaceimages-mars.com/" + img.toString();
  return imUrl;
};
// imageData()

async function marsFacts() {
  const html = await getHtmlPlaywright(factsUrl); 
  const $ = cheerio.load(html);
  const facts = $(".diagram-background");
  const output = facts.find("thead").text();
  const datas = facts.find("tbody");
  const fact = [];
  datas.each((i, dat) => {
    const item = $(dat).text();
    // var str2 = item.replace(/\n|\t|\r/g, "");
    fact.push(output);
    fact.push(item);
  })
  for(var p = 0; p < fact.length; p++){
    // console.log(fact[p]);
    return fact[p]; 
  }
}
// marsFacts()
async function imagesMars() {
  try{
    const { data } = await axios.get(astrologyUrl);
    const $ = cheerio.load(data);
    var astro = $(".results");
    var items = astro.find(".item");
    var imgList = [];
    items.each((l, ite) => {
      var item = $(ite).find("h3").text();
      var item1 = $(ite).find(".itemLink").attr("href");
      var imgLink = "https://astrogeology.usgs.gov/" + item1;
      imgList.push(item, imgLink); 
    })
    return imgList;
  }catch (err){
    console.error(err)
  }
}
// imagesMars()

module.exports = { newData, imageData, imagesMars, marsFacts };
