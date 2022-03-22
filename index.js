const express = require('express')
const app = express()
const port = process.env.port || 5000
const cors = require('cors')
require('dotenv').config();


app.use(cors());
app.use(express.json());


const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b1ws8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });
console.log(uri);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

async function run() {
    try {
        await client.connect();
        const database = client.db("hospital");
        const servicesCollection = database.collection("services");
        // query for movies that have a runtime less than 15 minutes
        console.log('connected');

        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})