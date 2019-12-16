// const {Sequilize, Model, DataTypes} = require('sequelize');
const Sequilize = require('sequelize');
                                // db name     db username   db password
const sequilize = new Sequilize('cUQ20WshXc','cUQ20WshXc','cjReENTNWC',{dialect:'mysql',host:'remotemysql.com'})
const {Model, DataTypes} = require('sequelize');

sequilize
    .authenticate()
    .then(() => {
        console.log('connection success')
    })
    .catch(err => {console.error('connection lost',err)})



// class User extends Model {}
// User.init({
//     username: DataTypes.STRING,
//     birthday: DataTypes.DATE
// },{sequilize, modelName:'user'})


// sequilize.sync()
//     .then(() => {User.create({username:'Tal',birthday: new Date(1993,4,23)})})
//     .then(tal => {console.log(tal.toJSON())})