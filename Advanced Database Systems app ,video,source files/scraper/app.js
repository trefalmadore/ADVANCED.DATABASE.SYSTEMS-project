const express = require('express');
const bodyParser= require('body-parser');
const scrape = require("./scrp");
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app = express();

mongoClient.connect(url, function(err, db){
  if (err) throw err;
  const dbo = db.db("Mission_to_Mars_DB");
  app.use(bodyParser.urlencoded({ extended: true }))
  app.set('view engine', 'ejs')
  app.listen(4000, function() {
    console.log('listening on 4000')
  });
  app.get('/', (req, res) => {
    dbo.collection("mars_db").find().toArray()
      .then(result => {
        for(var i = 0; i < result.length; i++){
          var title = result[i].nasa_news_title;
          var parag = result[i].nasa_news_paragraph;
          var img = result[i].full_image_url;
          var fact = result[i].hemisphere_img_urls;
          var mars = result[i].mars_facts;
          res.render('home.ejs', {result, fact, parag, title, img})
        }
      })
      .catch(error => console.error(error))
  })
  app.get('/data', (req, res) => {
    var data_info = [];
    var news = scrape.newData().then((rsl )=> {
      return `${rsl}`;
    });
    var img = scrape.imageData().then( (rsl1) => {
      return `${rsl1}`;
    });
    var imgMars = scrape.imagesMars().then((rsl2 )=> {
      return `${rsl2}`;
    });
    var facts = scrape.marsFacts().then((rsl3) => {
      return `${rsl3}`;
    });
    data_info.push(news, img, imgMars, facts);
    const newObject = Object.assign({}, data_info);
    console.log(newObject);
    dbo.collection("mars_db").insertOne(newObject)
      .then(result => {
        res.setHeader("Content-Type", "text/html");
        res.redirect('/')
        res.end()
      })
      .catch(error => console.error(error))
      // res.redirect('/');
    });
})