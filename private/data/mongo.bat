mongoimport --mode upsert --db meteor --collection products --port=3001 --file ./private/data/products.json
mongoimport --mode upsert --db meteor --collection categories --port=3001 --file ./private/data/categories.json
mongoimport --mode upsert --db meteor --collection retailers --port=3001 --file ./private/data/retailers.json