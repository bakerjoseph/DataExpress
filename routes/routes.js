const { application } = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
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

exports.createAccount = (req, res) => {
    let newUser = {
        username: req.body.username,
        password: hashbrown(req.body.password),
        email: req.body.email,
        age: req.body.age,
        ans1: req.body.Q1,
        ans2: req.body.Q2,
        ans3: req.body.Q3
    }
    await collection.insertOne(newUser);
    client.close();
    res.redirect('/index')
    //--------------------Hash & Salt-----------------------
    // Sychronous

    const hashbrown = banana => {
        let salt = bcrypt.genSaltSync(10);
        let hashbrown = bcrypt.hashSync(banana, salt)
        return hashbrown;
    }
}

// Get username's password
exports.api = async (req, res) => {
    await client.connect();
    const result = await collection.findOne({ "username": req.params.username });
    client.close();
    res.send(result.password);
}
