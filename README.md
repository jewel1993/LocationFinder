This is a demo application for finding possible proper location of the addresses searched against a text query.

the search query can be like:
1) Country name (India , USA , UK)
2) State name (Karnataka , Gujrat)
3) Proper place name
4) Text query (hotels in Delhi)

etc.

## Quick Start

create a file config.js inside the folder /server/   and paste this code into that file


    module.exports = {
       "GoogleMapAPIKey":"<YOUR_GOOGLE_MAP_API_KEY>"
    }



Need to type run the following commands inside both server and client folder to install and run

    $ npm install
    $ npm start

 1) Front end : http://localhost:4200/
 2) Back end : http://localhost:3300/
