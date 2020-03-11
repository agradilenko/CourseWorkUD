module.exports =(sequalize, Sequalize) => {
    const Discounts = sequalize.define("Discounts", {
            discountId: {
                type: Sequalize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            discountName: {
                type: Sequalize.STRING(100),
                allowNull: false,
                unique: true
            },
            discountDescription: {
                type: Sequalize.STRING(100),
                allowNull: false,
            },
            discountPercent: {
                type: Sequalize.DOUBLE,
                allowNull: false,
            },
        }, {
            timestamps: false
        }
    );

    return Discounts;
};
