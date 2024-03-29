const ws_connect_mongodb = require('./ws_connect_mongodb');

async function main() {
    try {
        // Connect to the MongoDB database
        const client = await ws_connect_mongodb.connect();
        console.log('Connected to MongoDB database');

        const db = client.db("defaultdb");
        const collection = db.collection('ws_masks');

        // Create (Insert a document)
        const doc = { id: '1', name: 'mask1', description: 'description1', mask_json: 'json1' };
        const result = await collection.insertOne(doc);
        console.log(`Inserted document with _id: ${result.insertedId}`);

        // Read (Find a document)
        const query = { id: '1' };
        const foundDoc = await collection.findOne(query);
        console.log(`Found document: ${JSON.stringify(foundDoc)}`);

        // Update (Update a document)
        const update = { $set: { name: 'updated mask' } };
        const updateResult = await collection.updateOne(query, update);
        console.log(`Updated ${updateResult.modifiedCount} document(s)`);

        // Delete (Delete a document)
        const deleteResult = await collection.deleteOne(query);
        console.log(`Deleted ${deleteResult.deletedCount} document(s)`);

    } catch (err) {
        console.error('Error performing CRUD operations', err);
    }
}

main();