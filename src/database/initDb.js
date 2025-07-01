const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  multipleStatements: true
});

const sql = `
-- Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS pets_db;

-- Seleciona o banco de dados para uso
USE pets_db;

-- Estrutura da tabela "users"
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('admin', 'adopter') NOT NULL DEFAULT 'adopter'
);

-- Estrutura da tabela "pets"
CREATE TABLE IF NOT EXISTS pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT,
  species VARCHAR(50) NOT NULL,
  size ENUM('small', 'medium', 'large') NOT NULL,
  status ENUM('available', 'adopted') NOT NULL DEFAULT 'available',
  description TEXT
);

-- Estrutura da tabela "adoptions"
CREATE TABLE IF NOT EXISTS adoptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  pet_id INT NOT NULL,
  adoption_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE RESTRICT,
  UNIQUE KEY unique_adoption (user_id, pet_id)
);
`;

connection.query(sql, (err, results) => {
  if (err) {
    console.error("Erro ao criar banco de dados:", err);
  } else {
    console.log("Banco de dados e tabelas criados com sucesso!");
  }
  connection.end();
});