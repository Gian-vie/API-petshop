const pool = require('../config/database');

// Cadastra um novo pet
const create = async ({ name, age, species, size, description }) => {
  const [result] = await pool.execute(
    'INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, "available", ?)',
    [name, age, species, size, description]
  );
  return { id: result.insertId, name, age, species, size, status: 'available', description };
};

// Lista todos os pets
const findAll = async () => {
  const [pets] = await pool.execute('SELECT * FROM pets');
  return pets;
};

// Lista apenas os pets disponíveis para adoção
const findAvailable = async () => {
  const [pets] = await pool.execute('SELECT * FROM pets WHERE status = "available"');
  return pets;
};

// Busca um pet pelo ID
const findById = async (id) => {
  const [pet] = await pool.execute('SELECT * FROM pets WHERE id = ?', [id]);
  return pet[0];
};

// Atualiza os dados de um pet (incluindo o status)
const update = async (id, { name, age, species, size, status, description }) => {
  // Lógica similar ao userModel para atualização dinâmica
  const fields = [];
  const values = [];

  if (name) { fields.push('name = ?'); values.push(name); }
  if (age) { fields.push('age = ?'); values.push(age); }
  if (species) { fields.push('species = ?'); values.push(species); }
  if (size) { fields.push('size = ?'); values.push(size); }
  if (status) { fields.push('status = ?'); values.push(status); }
  if (description) { fields.push('description = ?'); values.push(description); }

  if (fields.length === 0) {
    return findById(id);
  }

  values.push(id);
  const query = `UPDATE pets SET ${fields.join(', ')} WHERE id = ?`;
  
  await pool.execute(query, values);
  return findById(id);
};

// Remove um pet do sistema
const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM pets WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  create,
  findAll,
  findAvailable,
  findById,
  update,
  remove,
};