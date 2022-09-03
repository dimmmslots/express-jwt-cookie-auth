const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./helpers/database.js');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
    .then(() => {
        app.listen(3001, () => {
            console.log('Server is running at http://localhost:3000');
        });
    })
    .catch(err => {
        console.log(err);
    }
    );