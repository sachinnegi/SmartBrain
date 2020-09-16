const handleRegister = (req, res, db, bcrypt) => {
    const {name,email,password} = req.body;
    if (!name || !email || !password){
        res.status(400).json('Incorrect details')
        return
    }
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
}


module.exports = {
    handleRegister : handleRegister
}