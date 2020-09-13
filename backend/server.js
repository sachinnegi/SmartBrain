const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'sachin',
      password : 'sachinpassword',
      database : 'smartbrain'
    }
  });
  

// console.log(postgres.select('*').from('users')); 
  
const app = express();

app.use(cors())
app.use(bodyParser.json());

const database = {
    users: [
        {   
            id: '123',
            name: 'sachin',
            password: '12345',
            email:'sachin@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {   
            id: '125',
            name: 'sally',
            password: 'grapes',
            email:'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }

    ]
}

app.get('/',(req, res)=>{
    res.send(database.users);
})

//SIGN IN
app.post('/signin', (req, res) =>{

    if (req.body.name === "sachin" && req.body.password === '12345'){
        res.json(database.users[0]);
    }
    else{
        res.status(404).json('failed you cannot be send inside');
    }
})

//REGISTER  
app.post('/register', (req, res) =>{
    const {name,email,password} = req.body;
    db('users')
        .returning ('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user =>{
            res.json(user[0]);
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