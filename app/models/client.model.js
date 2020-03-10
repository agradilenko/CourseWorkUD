module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("Clients", {
            clientId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement:true
            },
            fullName: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique:true
            },
            city: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            address: {
                type: Sequelize.STRING(250),
                allowNull: false
            },
            phoneNumber: {
                type: Sequelize.STRING(11),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
        }, {
            timestamps:false
        }
    );

    return Client;
};
