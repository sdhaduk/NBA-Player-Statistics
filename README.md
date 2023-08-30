# NBA-Player-Statistics

## Description
* This is my full-stack project utlizing MySQL, Express, NodeJS, and EJS.
  
### The Steps I took to create this webapp: 
1. I downloaded a CSV of NBA player statistics and cleaned that data using the Pandas library in python - this process is shown in my NBA-Player-Statistics-DataCleaning Repository
2. Then I took that CSV and turned it into a JSON file to import into the MySQL database that I was using locally.
3. Then I created the front-end of the app with some simple EJS and CSS.
4. After completing the front end, I started working on the functionality of the webapp. I decided to use the mysql2 node package to execute querys on the database.
5. Once I completed the functionality, I decided to host the webapp using Heroku. First, I put my table of statistics into their ClearDB MySQL database.
6. Then I changed the authentication for the database in my index.js file, and then followed their steps to get my website hosted.
