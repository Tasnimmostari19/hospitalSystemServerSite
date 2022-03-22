const express = require('express')
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();


const port = process.env.port || 5000;


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



        ///get all data
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('started server genius')
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})