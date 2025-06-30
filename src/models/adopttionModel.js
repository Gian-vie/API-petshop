const pool = require('../config/database');

// Registra uma nova adoção
const create = async ({ userId, petId, adoptionDate }) => {
  const [result] = await pool.execute(
    'INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)',
    [userId, petId, adoptionDate]
  );
  return { id: result.insertId, userId, petId, adoptionDate };
};

// Lista todas as adoções com detalhes do usuário e do pet
const findAll = async () => {
  const [adoptions] = await pool.execute(`
    SELECT 
      a.id, a.adoption_date,
      u.id as userId, u.name as userName, u.email as userEmail,
      p.id as petId, p.name as petName, p.species as petSpecies
    FROM adoptions a
    JOIN users u ON a.user_id = u.id
    JOIN pets p ON a.pet_id = p.id
  `);
  return adoptions;
};

module.exports = {
  create,
  findAll,
};