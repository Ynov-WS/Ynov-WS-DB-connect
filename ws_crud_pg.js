const { Client } = require('pg');
const connectionOptions = {
    // your connection options
};

async function main() {
    try {
        // Connect to the PostgreSQL database
        const client = new Client(connectionOptions);
        await client.connect();
        console.log('Connected to PostgreSQL database');

        // Create (Insert a document)
        const insertQuery = `
            INSERT INTO ws_masks (name, description, mask_json)
            VALUES ($1, $2, $3)
            RETURNING id
        `;
        const values = ['mask1', 'description1', 'json1'];
        const result = await client.query(insertQuery, values);
        console.log(`Inserted document with id: ${result.rows[0].id}`);

        // Read (Find a document)
        const selectQuery = `
            SELECT * FROM ws_masks WHERE id = $1
        `;
        const selectResult = await client.query(selectQuery, [result.rows[0].id]);
        console.log(`Found document: ${JSON.stringify(selectResult.rows[0])}`);

        // Update (Update a document)
        const updateQuery = `
            UPDATE ws_masks SET name = $1 WHERE id = $2
        `;
        const updateResult = await client.query(updateQuery, ['updated mask', result.rows[0].id]);
        console.log(`Updated ${updateResult.rowCount} document(s)`);

        // Delete (Delete a document)
        const deleteQuery = `
            DELETE FROM ws_masks WHERE id = $1
        `;
        const deleteResult = await client.query(deleteQuery, [result.rows[0].id]);
        console.log(`Deleted ${deleteResult.rowCount} document(s)`);

    } catch (err) {
        console.error('Error performing CRUD operations', err);
    } finally {
        await client.end();
    }
}

main();