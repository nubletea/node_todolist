const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nuble_manager:<password>@nubletea.uarmq.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true});
client.connect(err => {
    const collection = client.db("test").collection("devices");
    client.close();
});