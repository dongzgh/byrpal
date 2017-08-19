REM LOCAL COMMANDS
mongoimport --mode upsert --db meteor --collection products --port=3001 --file ./private/data/products.json
mongoexport --db meteor --collection products --port=3001 --out products.json
mongoimport --mode upsert --db meteor --collection orders --port=3001 --file ./private/data/orders.json
mongoexport --db meteor --collection orders --port=3001 --out orders.json

REM HEROKU MLAB REMOTE COMMANDS
mongoimport -h ds149613.mlab.com:49613 -d heroku_wh8grsxz -c products --mode upsert -u heroku_wh8grsxz -p 941resqp5ggvm9fq1u9tgo6gl --file ./private/data/products.json
mongoimport -h ds149613.mlab.com:49613 -d heroku_wh8grsxz -c orders --mode upsert -u heroku_wh8grsxz -p 941resqp5ggvm9fq1u9tgo6gl --file ./private/data/orders.json