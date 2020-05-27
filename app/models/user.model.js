module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName : {
            type : Sequelize.STRING
        },
        lastName : {
            type : Sequelize.STRING
        },
        age : {
            type : Sequelize.INTEGER
        },
        email : {
            type : Sequelize.STRING
        },
        password : {
            type : Sequelize.STRING
        }
    }, {
        timestamps : false
    });

    return User;
};