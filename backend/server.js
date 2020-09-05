const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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


app.post('/signin', (req, res) =>{

    if (req.body.name === "sachin" && req.body.password === '12345'){
        res.json(database.users[0]);
    }
    else{
        res.status(404).json('failed you cannot be send inside');
    }
})


app.post('/register', (req, res) =>{
    const {name,email,password} = req.body;
    database.users.push(
        {
            id: '127',
            name: name,
            password: password,
            email: email,
            entries: 0,
            joined: new Date()
        }
    )
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
            res.json(user);
            return
        }
    })
    res.status(404).json('user not found');
})

app.listen(3001,()=>{
    console.log('woooo started have fun');
});