const express = require('express')
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const objectId = require('mongodb').ObjectId;


const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b1ws8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });
console.log(uri);




async function run() {
    try {
        await client.connect();
        // console.log('connected');
        const database = client.db("hospital");
        const servicesCollection = database.collection("services");
        const doctorsCollection = database.collection("doctors");



        ///get all data
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: objectId(id) };
            const service = await servicesCollection.findOne(query)
            res.json(service);


        })
        app.get('/doctors', async (req, res) => {
            const cursor = doctorsCollection.find({});
            const doctors = await cursor.toArray();
            res.send(doctors);
        })
        app.get('/doctors/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: objectId(id) };
            const doctor = await doctorsCollection.findOne(query)
            res.json(doctor)


        })



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('started server')
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})