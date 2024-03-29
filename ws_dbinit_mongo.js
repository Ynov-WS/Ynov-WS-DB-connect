const ws_connect_mongodb = require('./ws_connect_mongodb');

async function main() {
    try {
        // Connect to the MongoDB database
        const client = await ws_connect_mongodb.connect();
        console.log('Connected to MongoDB database');

        let db = client.db("defaultdb")

        // Create ws_masks collection if it doesn't exist
        const ws_masks = db.collection('ws_masks');
        if (!await ws_masks.findOne()) {
            await db.createCollection('ws_masks');
            console.log('ws_masks collection created');
        }

        // Create ws_entries collection if it doesn't exist
        const ws_entries = db.collection('ws_entries');
        if (!await ws_entries.findOne()) {
            await db.createCollection('ws_entries');
            console.log('ws_entries collection created');
        }

        // Close the connection
        await client.close();
    } catch (err) {
        console.error('Error connecting to MongoDB database', err);
    }
}

main();