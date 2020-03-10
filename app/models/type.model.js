module.exports =(sequalize, Sequalize) => {
    const Type = sequalize.define("Types", {
        typeId: {
            type: Sequalize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: Sequalize.STRING(100),
            allowNull: false,
            unique: true
        },
    }, {
        timestamps: false
        }
    );

    return Type;
};
