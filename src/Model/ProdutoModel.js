const Sequelize = require("sequelize");
const connection = require("../../database/database");



const Produto = connection.define('produto', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
    quantidade: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    observacoes: {
        type: Sequelize.TEXT,
        allowNull: true
    }
},
{
  indexes: [
    {
      fields: ["nome"], // Índice na coluna 'nome'
    },

  
  ],
})


module.exports = Produto;
