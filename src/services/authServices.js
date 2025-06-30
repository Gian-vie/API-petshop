const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authenticateUser = async ({ email, password }) => {
  // 1. Busca o usuário pelo e-mail
  const user = await userModel.findByEmail(email);
  if (!user) {
    throw new Error('Credenciais inválidas'); // Usuário não encontrado
  }

  // 2. Compara a senha fornecida com a senha hasheada no banco
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas'); // Senha incorreta
  }

  // 3. Se as credenciais estiverem corretas, gera o token JWT
  const token = jwt.sign(
    { userId: user.id, role: user.role }, // Payload: informações que o token carregará
    process.env.JWT_SECRET, // Segredo para assinar o token
    { expiresIn: '1h' } // Opções, como o tempo de expiração
  );

  return { token };
};

module.exports = {
  authenticateUser,
};