const bcrypt = require('bcrypt')
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb+srv://user:dataexpress1-@cluster0.2jez0.mongodb.net/Userdb?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'Userdb';
const db = client.db(dbName);
const collection = db.collection('Users');

exports.index = (req, res) => {
    res.render('index');
}

exports.login = (req, res) => {
    res.render('login')

}

exports.createLogin = (req, res) => {
    res.render('newUser')
}

exports.createAccount = async (req, res) => {
    //--------------------Hash & Salt-----------------------
    // Sychronous

    const hashbrown = banana => {
        let salt = bcrypt.genSaltSync(10);
        let hashbrown = bcrypt.hashSync(banana, salt)
        return hashbrown;
    }
    let newUser = {
        username: req.body.username,
        password: hashbrown(req.body.password),
        email: req.body.email,
        age: req.body.age,
        ans1: req.body.Q1,
        ans2: req.body.Q2,
        ans3: req.body.Q3
    }
    await client.connect();
    await collection.insertOne(newUser);
    client.close();
    res.redirect('/index')
}

// Get username's password
exports.api = async (req, res) => {
    await client.connect();
    const result = await collection.findOne({ "username": req.params.username });
    client.close();
    res.send(result.password);
}
