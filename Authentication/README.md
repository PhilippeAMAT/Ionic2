# Ionic2
Exemples of token authentication with jwt

##backend server use mongodb
	1. config
		* database : //localhost:27017/ionicdb
		* REST : //localhost:3333
			- /authenticate POST (Content-Type:application/json, body {"name": "xxx", "password": "xxx"} return token
			- /adduser POST (Content-Type:application/json, body {"name": "xxx", "password": "xxx"}
		
	2. install and start
		* npm install
		* node serve.js
	
##frontend use ionic 2 login page with some validators on user name and password

	1.  install and start
		* npm install
		* ionic serve