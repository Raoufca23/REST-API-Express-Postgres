module.exports = (sequelize, Sequelize) => {
    const Reserve = sequelize.define("reserve", {
        name : {
            type : Sequelize.STRING(50)
        },
        comments : {
            type : Sequelize.TEXT
        }
    }, {
        timestamps : false
    });

    return Reserve;
};