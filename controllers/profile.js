const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => {  
        if (user.length) { //if user exists
            res.json(user[0])
        } else {
            res.status(400).json('not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet
}