module.exports =(sequalize, Sequalize) => {
    const Ordered = sequalize.define("Ordered", {
            orderId: {
                type: Sequalize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            productId: {
                type: Sequalize.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: Sequalize.INTEGER,
                allowNull: false,
            },
            discountId: {
                type: Sequalize.INTEGER,
                allowNull: false,
            },
        }, {
            timestamps: false
        }
    );

    return Ordered;
};
