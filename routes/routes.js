const bcrypt = require('bcrypt')
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb+srv://user:dataexpress1-@cluster0.2jez0.mongodb.net/Userdb?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'Userdb';
const db = client.db(dbName);
const collection = db.collection('Users');

//--------------------Hash & Salt-----------------------
// Sychronous

const hashbrown = banana => {
    let salt = bcrypt.genSaltSync(10);
    let hashbrown = bcrypt.hashSync(banana, salt)
    return hashbrown;
}

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
    const result = await collection.insertOne(newUser);
    client.close();
    res.redirect('/index');
}

// Get username's password
const findUser = async (username) => {
    await client.connect();
    const user = await collection.findOne({ "username": username });
    client.close();
    return user;
}

exports.getUser = async (req, res) => {
    const result = await findUser((req.query.username) ? req.query.username : req.session.user.username);
    res.json(result);
}

// Edit User
exports.edit = async (req, res) => {
    await client.connect();
    const filteredDocs = await collection.find({ "username": req.session.user.username }).toArray();
    client.close();
    res.render('editUser', {
        person: filteredDocs[0]
    });
}

exports.editUser = async (req, res) => {
    await client.connect();
    const updateResult = await collection.updateOne(
        { username: req.session.user.username },
        {
            $set: {
                username: req.body.username,
                email: req.body.email,
                age: req.body.age,
                ans1: req.body.Q1,
                ans2: req.body.Q2,
                ans3: req.body.Q3
            }
        }
    )
    client.close();
    res.redirect('/index');
}

// API Call to get the totals for each question
exports.api = async (req, res) => {
    // Get all users
    await client.connect();
    const result = await collection.find({}).toArray();
    client.close();
    let q1dog = 0, q1cat = 0, q1goat = 0, q1goose = 0;
    let q2english = 0, q2korean = 0, q2chinese = 0, q2french = 0;
    let q3yes = 0, q3no = 0, q3maybe = 0;
    for (let i = 0; i < result.length; i++) {
        switch (result[i].ans1) {
            case "dog":
                q1dog++;
                break;
            case "cat":
                q1cat++;
                break;
            case "goat":
                q1goat++;
                break;
            case "goose":
                q1goose++;
                break;
        }
        switch (result[i].ans2) {
            case "english":
                q2english++;
                break;
            case "korean":
                q2korean++;
                break;
            case "chinese":
                q2chinese++;
                break;
            case "french":
                q2french++;
                break;
        }
        switch (result[i].ans3) {
            case "yes":
                q3yes++;
                break;
            case "no":
                q3no++;
                break;
            case "maybe":
                q3maybe++;
                break;
        }
    }
    const totals = {
        dog1: q1dog,
        cat1: q1cat,
        goat1: q1goat,
        goose1: q1goose,
        english2: q2english,
        korean2: q2korean,
        chinese2: q2chinese,
        french2: q2french,
        yes3: q3yes,
        no3: q3no,
        mayb3: q3maybe
    }
    res.json(totals);
}