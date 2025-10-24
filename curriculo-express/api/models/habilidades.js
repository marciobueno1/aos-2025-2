const getHabilidadesModel = (sequelize) => {
    const habilidades = sequelize.define('habilidades', {
        habilidade: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    return Habilidades;
}
export default getHabilidadesModel;