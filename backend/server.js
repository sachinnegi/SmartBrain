const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

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
app.post('/signin', (req, res) =>{
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
            .then(data => {
                const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
                if (isValid){
                    return db.select('*').from('users')
                        .where('email', '=', req.body.email)
                        .then(user=>{
                            res.json(user[0])
                        })
                        .catch(err => res.status(400).json('unable to get user'))
                }
                else{
                    res.status(400).json('wrong credentials')
                }
            })
            .catch(err => res.status(400).json(err,'wrong submission'))
})

//REGISTER  
app.post('/register', (req, res) =>{
    const {name,email,password} = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning ('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user =>{
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch((error) => res.status(400).json(error));
})


app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user=>{
            if (user.length==0){
                res.status(400).json('Not Found')
            }
            else{
            res.json(user[0])
            }
        })
        .catch(error=> res.status(400).json(error));
})


app.put('/image', (req, res) => {
    const {id} = req.body;
    db('users')
    .where('id', '=', 1)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(error => res.status(400).json('problem'))
})

app.listen(3001,()=>{
    console.log('woooo started have fun');
});