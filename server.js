const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./helpers/database.js');
const userRoute = require('./routes/userRoute.js');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoute);

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