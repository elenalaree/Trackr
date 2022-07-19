const express = require('express');
const db = require('./db/connection');

const PORT = process.env.PORT || 3002;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const inputCheck = require('./utils/inputCheck');
//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Default response for any other request (Not found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});