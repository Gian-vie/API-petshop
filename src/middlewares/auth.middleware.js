const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido ou malformatado.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
    // Anexa os dados do usuário (payload do token) ao objeto da requisição
    req.user = decoded;
    next(); // Passa para a próxima função (outro middleware ou o controller)
  });
};

// Middleware para verificar se o usuário é um administrador
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
  }
};

// Middleware para verificar se o usuário é um adotante
const isAdopter = (req, res, next) => {
  if (req.user && req.user.role === 'adopter') {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso negado. Apenas adotantes podem realizar esta ação.' });
  }
};

// Middleware para permitir acesso a si mesmo ou a um admin
const isSelfOrAdmin = (req, res, next) => {
  const { id: targetUserId } = req.params; // ID do usuário que se quer acessar/modificar
  const { userId: requesterId, role: requesterRole } = req.user; // ID e role de quem faz a requisição
console.log( req.user.userId)
  if (requesterRole === 'admin' || String(requesterId) === String(targetUserId)) {
    next();
  } else {
    return res.status(403).json({ message: 'Acesso negado. Você só pode acessar ou modificar seu próprio perfil.' });
  }
};

module.exports = {
  verifyJWT,
  isAdmin,
  isAdopter,
  isSelfOrAdmin,
};