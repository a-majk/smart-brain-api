const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
      connectionstring : 'postgres://smart_brain_db_c95p_user:1zqQUXaEHAtaktMQHt1C2iGyzxeoJOls@dpg-cf2rdrp4reb5o46nd72g-a.frankfurt-postgres.render.com/smart_brain_db_c95p'
      ssl : true,
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('oh hey!') });
app.post('/signin', signin.handleSignin (db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet (req, res, db) });
app.put('/image', (req, res) => { image.handleImage (req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall (req, res) });

app.listen(process.env.PORT || 3000, () =>{
    console.log(`app is running on port ${process.env.PORT}`);
    console.log(process.env.PORT);
});

