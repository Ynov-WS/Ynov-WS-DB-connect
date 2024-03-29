const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hugogehringer:s79fYHWdRjDveb2v@ynov-ws.m8rl3my.mongodb.net/?retryWrites=true&w=majority&appName=ynov-ws";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connect() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("defaultdb").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return client; // return the client object
    } catch (error) {
        console.error('Error connecting to MongoDB database', error);
    }
}

module.exports = {
    connect
};