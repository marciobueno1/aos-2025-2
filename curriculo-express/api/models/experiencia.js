const getexperinciaModel = (sequelize, DataTypes) => {
    const Experiencia = sequelize.define('experiencia', {
        empresa: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                notEmpty: true, 
            },
        },
        cargo: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                notEmpty: true, 
            },
        },
        duracao: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                notEmpty: true, 
            },
        },
    });

    return Experiencia;
}
export default getexperinciaModel;