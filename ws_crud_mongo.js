const ws_connect_mongodb = require('./ws_connect_mongodb');

async function main() {
    try {
        // Connect to the MongoDB database
        const client = await ws_connect_mongodb.connect();
        console.log('Connected to MongoDB database');

        const db = client.db("defaultdb");
        //ws masks
        const collection = db.collection('ws_masks');
        insertIntoCollection(collection,{ id: '1', name: 'mask1', description: 'description1', mask_json: 'json1' })

        findInCollectionByQuery(collection,{id :'1'})

        updateInCollection(collection,{id :'1'},{ $set: { name: 'updated mask' } })

        deleteInCollection(collection,{id :'1'})

        //ws entries
        const collectionEntries= db.collection('ws_entries');
        insertIntoCollection(collectionEntries,{ id: '1', id_mask: '1',  entry_json: {test:'test'} })

        findInCollectionByQuery(collectionEntries,{id :'1'})

        updateInCollection(collection,{id :'1'},{ $set: { entry_json: {test:'test'} } })

        deleteInCollection(collectionEntries,{id :'1'})

    } catch (err) {
        console.error('Error performing CRUD operations', err);
    }
}

main();

async function insertIntoCollection(collectionName, data){
    const result = await collectionName.insertOne(data);
    console.log(`Inserted document with _id: ${result.insertedId}`);
}

async function findInCollectionByQuery(collectionName, query){
    const foundDoc = await collectionName.findOne(query);
    console.log(`Found document: ${JSON.stringify(foundDoc)}`);
}

async function updateInCollection(collectionName, query, update){
    const updateResult = await collectionName.updateOne(query, update);
    console.log(`Updated ${updateResult.modifiedCount} document(s)`);
}

async function deleteInCollection(collectionName, query){
    const deleteResult = await collectionName.deleteOne(query);
    console.log(`Deleted ${deleteResult.deletedCount} document(s)`);
}