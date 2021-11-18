const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'Datadb';
const db = client.db(dbName);
const collection = db.collection('Jokes');

exports.index = (req, res) => {
    res.send('This is a sample page, future home of stuff');
}
