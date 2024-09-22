const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.NODE_ENV === 'production') {

} else { 
  // Conexão local
  sequelize = new Sequelize('product', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });
  console.log('conectado ao banco LOCAL')
  sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados atualizado com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao atualizar o banco de dados:', err);
  });
}

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

// DELETE FROM vendas WHERE id = 1;
// select * from vendas

// TRUNCATE TABLE tbl_teste_incremento;  -> deleta todos os registros

// atualizando vários itens ao mesmo tempo
// SET SQL_SAFE_UPDATES = 0;
// UPDATE vendas
// SET tipo_pagamento = 'Débito'
// WHERE tipo_pagamento = 'debito';