#!/bin/bash

echo -e "Npm package install"


npm list  
npm list -g 
npm root 
npm root -g

npm i body-parser compression cors csurf cookie-parser  dotenv ejs  express express-rate-limit  --save    
npm i helmet mongodb morgan mongoose swagger-jsdoc swagger-ui-express  typescript  winston --save  

npm i body-parser compression cors csurf cookie-parser  dotenv ejs  express express-rate-limit  -g    
npm i helmet mongodb morgan mongoose swagger-jsdoc swagger-ui-express  typescript  winston -g 