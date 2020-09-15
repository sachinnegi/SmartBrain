const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const register = require('./Controllers/Register');
const signin = require('./Controllers/Siginin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const app = express();
app.use(cors())
app.use(bodyParser.json());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'sachin',
      password : 'sachinpassword',
      database : 'smartbrain'
    }
  });
  
  




app.get('/',(req, res)=>{
    res.send(database.users);
})

//SIGN IN
app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)} )

//REGISTER  
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)} )

//put
app.get('/profile/:id',(req,res) => { profile.handleProfileGet(req,res,db)} )

//image entries
app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.listen(3001,()=>{
    console.log('woooo started have fun');
});