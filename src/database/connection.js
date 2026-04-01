// Carrega as variáveis de ambiente do arquivo .env
// Isso permite usar process.env.DB_HOST, process.env.DB_USER, etc.
require('dotenv').config();

// Importa o mysql2 com suporte a Promises (async/await)
// A versão '/promise' permite usar await nas queries, sem precisar de callbacks
const mysql = require('mysql2/promise');

// Função assíncrona que cria e retorna uma conexão com o banco de dados
// É exportada para ser usada em qualquer parte do projeto
async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,         // Endereço do servidor MySQL (ex: localhost)
    user: process.env.DB_USER,         // Usuário do banco (ex: root)
    password: process.env.DB_PASSWORD, // Senha do banco
    database: process.env.DB_NAME,     // Nome do banco de dados a ser usado
  });

  return connection; // Retorna a conexão ativa para ser usada em queries
}

// Exporta a função para que outros arquivos possam importá-la com:
// const { getConnection } = require('./src/database/connection');
module.exports = { getConnection };
