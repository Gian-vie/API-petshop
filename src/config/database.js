// Importa o driver MySQL compatível com Promises
const mysql = require("mysql2/promise");
// Carrega variáveis de ambiente do arquivo .env
require("dotenv").config();
// Cria um pool de conexões com o banco de dados MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Endereço do servidor MySQL
  user: process.env.DB_USER, // Usuário do banco
  password: process.env.DB_PASSWORD, // Senha do usuário
  database: process.env.DB_DATABASE, // Nome do banco de dados
  waitForConnections: true, // Aguarda caso todas as conexões estejam em uso
  connectionLimit: 10, // Número máximo de conexões simultâneas
});
// Exporta o pool para ser reutilizado em outras partes do projeto
module.exports = pool;
