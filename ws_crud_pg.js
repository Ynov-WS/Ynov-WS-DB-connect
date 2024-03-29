const { Client } = require('pg');
const connectionOptions = {
    user: 'avnadmin',
    host: 'post-tropical-alexandre-12345.a.aivencloud.com',
    database: 'defaultdb',
    password: 'AVNS_OtvJABv3Vzkb1MxEwDS',
    port: 17703, // default PostgreSQL port
    ssl: {
        rejectUnauthorized: false,
    },
};

async function main() {
    try {
        // Connect to the PostgreSQL database
        const client = new Client(connectionOptions);
        await client.connect();
        console.log('Connected to PostgreSQL database');

        // Create (Insert a document) in ws_masks
        const insertMaskQuery = `
            INSERT INTO ws_masks (name, description, mask_json)
            VALUES ($1, $2, $3)
            RETURNING id
        `;
        const maskValues = ['mask1', 'description1', 'json1'];
        const maskResult = await client.query(insertMaskQuery, maskValues);
        console.log(`Inserted mask with id: ${maskResult.rows[0].id}`);

        // Create (Insert a document) in ws_entries
        const insertEntryQuery = `
            INSERT INTO ws_entries (id_mask, mask_json)
            VALUES ($1, $2)
            RETURNING id
        `;
        const entryValues = [maskResult.rows[0].id, 'entry_json1']; // Use the id of the mask created above
        const entryResult = await client.query(insertEntryQuery, entryValues);
        console.log(`Inserted entry with id: ${entryResult.rows[0].id}`);

        // Read (Find a document) in ws_masks
        const selectMaskQuery = `
            SELECT * FROM ws_masks WHERE id = $1
        `;
        const selectMaskResult = await client.query(selectMaskQuery, [maskResult.rows[0].id]);
        console.log(`Found mask: ${JSON.stringify(selectMaskResult.rows[0])}`);

        // Read (Find a document) in ws_entries
        const selectEntryQuery = `
            SELECT * FROM ws_entries WHERE id = $1
        `;
        const selectEntryResult = await client.query(selectEntryQuery, [entryResult.rows[0].id]);
        console.log(`Found entry: ${JSON.stringify(selectEntryResult.rows[0])}`);

        // Update (Update a document) in ws_masks
        const updateMaskQuery = `
            UPDATE ws_masks SET name = $1 WHERE id = $2
        `;
        const updateMaskResult = await client.query(updateMaskQuery, ['updated mask', maskResult.rows[0].id]);
        console.log(`Updated ${updateMaskResult.rowCount} mask(s)`);

        // Update (Update a document) in ws_entries
        const updateEntryQuery = `
            UPDATE ws_entries SET mask_json = $1 WHERE id = $2
        `;
        const updateEntryResult = await client.query(updateEntryQuery, ['updated_entry_json', entryResult.rows[0].id]);
        console.log(`Updated ${updateEntryResult.rowCount} entry(s)`);

        // Delete (Delete a document) in ws_entries
        const deleteEntryQuery = `
    DELETE FROM ws_entries WHERE id_mask = $1
`;
        const deleteEntryResult = await client.query(deleteEntryQuery, [maskResult.rows[0].id]);
        console.log(`Deleted ${deleteEntryResult.rowCount} entry(s)`);

// Delete (Delete a document) in ws_masks
        const deleteMaskQuery = `
    DELETE FROM ws_masks WHERE id = $1
`;
        const deleteMaskResult = await client.query(deleteMaskQuery, [maskResult.rows[0].id]);
        console.log(`Deleted ${deleteMaskResult.rowCount} mask(s)`);

        // Close the connection
        await client.end();
    } catch (err) {
        console.error('Error performing CRUD operations', err);
    }
}

main();