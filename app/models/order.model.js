module.exports =(sequalize, Sequalize) => {
    const Order = sequalize.define("Order", {
            orderId: {
                type: Sequalize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            orderDate: {
                type: Sequalize.DATEONLY,
                allowNull: false,
            },
            orderExecutionDate: {
                type: Sequalize.DATEONLY,
                allowNull: false,
            },
            clientId: {
                type: Sequalize.INTEGER,
                allowNull: false,
            },
            deliveryId: {
                type: Sequalize.INTEGER,
                allowNull: false,
            },
            deliveryCost: {
                type: Sequalize.INTEGER,
                allowNull: false,
            },
        }, {
            timestamps: false
        }
    );

    return Order;
};
