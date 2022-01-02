var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');



const uri = "mongodb://127.0.0.1:27017/directConnection=true&serverSelectionTimeoutMS=2000";
const client = new MongoClient(uri);



async function run() {
    try {
        await client.connect();
        const database = client.db("fruits");
        const fruits = database.collection("fruit");
        // create a document to insert
        const doc = [{
                fruits: "banana",
                vitamin: "A"
            },
            {
                fruits: "apple",
                vitamin: "C"
            }
        ]
        const result = await fruits.insertMany(doc);
        console.log("A document was inserted with the _id:");
        const fruit = await fruits.findOne();
        // since this method returns the matched document, not a cursor, print it directly
        console.log(fruit);
    } finally {
        await client.close();
    }

}

run().catch(console.dir);