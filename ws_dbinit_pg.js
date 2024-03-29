const { Client } = require('pg');

// Connection information for your PostgreSQL database
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

// Create a new PostgreSQL client
const client = new Client(connectionOptions);

// Connect to the database
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');

        // SQL query to create a table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ws_masks (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                description VARCHAR(100),
                mask_json VARCHAR(100)
            );
            CREATE TABLE IF NOT EXISTS ws_entries (
                id SERIAL PRIMARY KEY,
                id_mask integer NOT NULL,
                FOREIGN KEY (id_mask) REFERENCES ws_masks(id),
                mask_json VARCHAR(100)
                );
        `;

        // Execute the query
        return client.query(createTableQuery);
    })
    .then(() => {
        console.log('Table created successfully');
    })
    .catch(error => {
        console.error('Error executing query', error);
    })
    .finally(() => {
        // When done, close the connection
        client.end();
    });