const pool = require('../config/database');

// Insere um novo usuário no banco de dados
const create = async ({ name, email, password, phone, role }) => {
  const [result] = await pool.execute(
    'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, password, phone, role]
  );
  return { id: result.insertId, name, email, phone, role };
};

// Busca todos os usuários (sem a senha)
const findAll = async () => {
  const [users] = await pool.execute('SELECT id, name, email, phone, role FROM users');
  return users;
};

// Busca um usuário pelo ID (sem a senha)
const findById = async (id) => {
  const [user] = await pool.execute('SELECT id, name, email, phone, role FROM users WHERE id = ?', [id]);
  return user[0];
};

// Busca um usuário pelo e-mail (usado para login e para verificar duplicados)
const findByEmail = async (email) => {
  const [user] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return user[0];
};

// Atualiza um usuário
const update = async (id, { name, email, password, phone }) => {
  // Constrói a query dinamicamente para atualizar apenas os campos fornecidos
  const fields = [];
  const values = [];
  if (name) {
    fields.push('name = ?');
    values.push(name);
  }
  if (email) {
    fields.push('email = ?');
    values.push(email);
  }
  if (password) {
    fields.push('password = ?');
    values.push(password);
  }
  if (phone) {
    fields.push('phone = ?');
    values.push(phone);
  }

  if (fields.length === 0) {
    return findById(id); // Retorna o usuário sem alterações se nada for fornecido
  }

  values.push(id);
  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  await pool.execute(query, values);
  return findById(id);
};

// Remove um usuário pelo ID
const remove = async (id) => {
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  create,
  findAll,
  findById,
  findByEmail,
  update,
  remove,
};