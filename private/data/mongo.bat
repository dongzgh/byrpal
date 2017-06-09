mongoimport --mode upsert --db meteor --collection products --port=3001 --file ./private/data/products.json
mongoexport --db meteor --collection products --port=3001 --out products_full.json
mongoimport --mode upsert --db meteor --collection orders --port=3001 --file ./private/data/orders.json