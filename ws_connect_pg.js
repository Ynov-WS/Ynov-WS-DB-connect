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
        // You can execute queries or perform other operations here
    })
    .catch(error => {
        console.error('Error connecting to PostgreSQL database', error);
    });

// When done, close the connection
// client.end();