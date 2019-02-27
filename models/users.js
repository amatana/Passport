var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/passport', { logging: false });
var crypto = require ('crypto')

var User = db.define('user', {
    username: {
        type: Sequelize.STRING
    },
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
    usernameVirtual: {
        type: Sequelize.VIRTUAL,
        get(){
            return this.getDataValue("email").split("@")[0]
        }
    }
});

User.hook('beforeCreate',(user,options)=> {
user.salt = crypto.randomBytes(20).toString('hex')
let pass = options.password + user.salt
pass = crypto.createHash('RSA-SHA256').update(pass).digest('hex')
user.password = pass
})


module.exports = {
    User,
    db
}  
