const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/search', async (req, res) => {
    const { ingredients, appliances, methods } = req.body;
    try {
        // Example query; adjust as needed
        const query = `
            SELECT * FROM recipes
            WHERE ingredients @> $1
            AND appliances @> $2
            AND methods @> $3
        `;
        const values = [ingredients, appliances, methods];
        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
