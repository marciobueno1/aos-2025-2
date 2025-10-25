import { DataTypes } from "sequelize";
const getFormacaoModel = (sequelize) => {
    const Formacao = sequelize.define('formacao', {
        instituicao: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                notEmpty: true, 
            },
        },
        grau: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                notEmpty: true, 
            },
        },
    });

    return Formacao;
}
export default getFormacaoModel;