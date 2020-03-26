module.exports =(sequalize, Sequalize) => {
    const Delivery = sequalize.define("Delivery", {
            deliveryId: {
                type: Sequalize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            deliveryName: {
                type: Sequalize.STRING(100),
                allowNull: false,
                unique: true
            },
            phoneNumber: {
                type: Sequalize.STRING(100),
                allowNull: false,
            },
            email: {
                type: Sequalize.STRING(100),
                allowNull: false,
            },
        }, {
            timestamps: false,
        freezeTableName: true
        }
    );

    return Delivery;
};
