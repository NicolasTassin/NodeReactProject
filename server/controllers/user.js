const User = require('../models/user')



exports.read = (req, res) => {
    const userId = req.params.id
    User.findById(userId).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }
        user.hased_password = undefined
        user.salt = undefined
        res.json(user)
    })
}
//Profile update
exports.update = (req, res) =>{
    //console.log('UPDATE USER', req.user , 'UPDATE DATA', req.body)
    const {name, password} = req.body

    User.findOne({_id: req.user._id}, (err, user) =>{
        if (err || !user){
            return res.status(400).json({
                error: 'User not found'
            })
        }
        //Validation control
        if(!name){
            return res.status(400).json({
                error: 'Name is required'
            })
        } else {
            user.name = name
        }

        if(password){
            if(password.length <6 ){
                return res.status(400).json({
                    error: 'Password should be minimun 6 characters long'
                })
            }else {
                user.password = password
            }
        }

        user.save((err, updatedUser) => {
            if(err){
                console.log('USER UPDATE ERROR', err)
                return res.status(400).json({
                    error: 'User update failed'
                })
            }
            updatedUser.hashed_password = undefined
            updatedUser.salt = undefined
            res.json(updatedUser)

        })
        
    })
}