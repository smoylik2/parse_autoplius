# parse_autoplius

This application can parse web-site Autoplius.lt and sorted car-list from models.
Create rating list, where u can see count model, min-max prise n year, photo by model of car.

U can try this from link: https://lit-brook-74241.herokuapp.com
Put to field something like that: https://ru.autoplius.lt/objavlenija/b-u-avtomobili?body_type_id=1&category_id=2&fuel_id=30&sell_price_from=1000&sell_price_to=2000&slist=1311579675

App structure:
  - index.js have a server logic ( use express js )
  - createHtml.js cook final html-page
  - business-logic.js prapare data for user
  - data-acces.js parse all pages from links ( use axios and cheerio from npm js)
