var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/passport', { logging: false });
var crypto = require ('crypto')

var User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password : {
        type: Sequelize.STRING,
    },
    salt: {
        type: Sequelize.STRING,
    },
});

User.hook('beforeValidate',(user,options)=> {
user.salt = crypto.randomBytes(20).toString('hex')
let pass = options.password + user.salt
console.log(pass)
pass = crypto.createHash('RSA-SHA256').update(pass).digest('hex')
console.log(pass,'=======================================')
user.password = pass
console.log(user.password,'=======================================')
})


module.exports = {
    User,
    db
}  
