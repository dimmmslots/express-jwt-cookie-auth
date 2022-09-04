const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./helpers/database.js');
const userRoute = require('./routes/userRoute.js');
const indexRoute = require('./routes/indexRoute.js');
const protectedRoute = require('./routes/protectedRoute.js');
const cookieParser = require('cookie-parser');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/protected', protectedRoute);
app.use('/api', userRoute);
app.use('/', indexRoute);

db.sequelize.sync()
    .then(() => {
        app.listen(3001, () => {
            console.log('Server is running at http://localhost:3001');
        });
    })
    .catch(err => {
        console.log(err);
    }
    );