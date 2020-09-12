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
    db('users').insert({
        email: email,
        name: name,
        joined: new Date()
    }).then(console.log)
    res.json(database.users[database.users.length-1]);
})


app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === id){
            res.json(user);
            return
        } 
    });
    res.status(404).json('user not found');
})


app.put('/image', (req, res) => {
    const {id} = req.body;
    database.users.forEach(user => {
        if ( user.id === id){
            user.entries++;
            res.json(user.entries);
            return
        }
    })
    res.status(404).json('user not found');
})

app.listen(5001,()=>{
    console.log('woooo started have fun');
});