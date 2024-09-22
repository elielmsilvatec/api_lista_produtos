const Sequelize = require("sequelize");
const connection = require("../../database/database");
const Produto = require("./ProdutoModel");

const Categoria = connection.define("category", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
{
  indexes: [
    {
      fields: ["nome"], // Índice na coluna 'nome'
    },
  ],
});

Categoria.hasMany(Produto, {
  foreignKey: 'categoriaId',
  sourceKey: 'id'
});

Produto.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  targetKey: 'id'
});

module.exports = Categoria;
