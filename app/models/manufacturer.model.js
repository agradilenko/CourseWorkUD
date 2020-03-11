module.exports =(sequalize, Sequalize) => {
    const Manufacturer = sequalize.define("Manufacturer", {
            manufacturerId: {
                type: Sequalize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            manufacturerName: {
                type: Sequalize.STRING(100),
                allowNull: false,
                unique: true
            },
            manufacturerCountry: {
                type: Sequalize.STRING(100),
                allowNull: false,
            },
            headquarters: {
                type: Sequalize.STRING(100),
                allowNull: false,
            },
        }, {
            timestamps: false
        }
    );

    return Manufacturer;
};
