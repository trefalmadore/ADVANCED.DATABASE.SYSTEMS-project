# Mars Facts And Info

In this assignment, I build a web application that scrapes various websites for data related to the Mars and displays the information in a single HTML page. 


## Project setup

This app contains both the backend and the frontend in a single repository.

├── Readme.md

├── backend - Nodejs - app.js - scrp.js

└── frontend - Views

app.js contains the main code of the project. It connects to the database and starts the server.


scrp.js is the code that i used to scrape data from different websites.



## Tech Stack

* Node JS this acts as the backend to web application. It reads data from database and uploads in the database.

* MongoDB this stores data that has been scraped.

* Frontend part i have used express js since node cannot be able to parse data directly to html.

## Running project app.
To run the project 

Clone git repo

cd into the directory

open terminal or command prompt

then type

`npm install` to install the depedencies.

connect to your mongodb database and configure it in app.js

`nodemon` or `node app.js` to run the web app.

go to the browser a open localhost:4000

data i have already scraped in mars.csv file.

## License
[MIT](https://choosealicense.com/licenses/mit/)
