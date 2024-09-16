const pool = require('../utils/db');  // Import the DB connection pool

// Get all users
async function findAllUsers() {
  const [rows] = await pool.query('SELECT * FROM user');
  return rows;
}

// Get user by ID
async function findUserById(id) {
  const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
  return rows[0];
}

// Create a new user
async function createUser(userData) {
  const [result] = await pool.query('INSERT INTO user SET ?', userData);
  return { id: result.insertId, ...userData };
}

// Update a user
async function updateUser(id, userData) {
  await pool.query('UPDATE user SET ? WHERE id = ?', [userData, id]);
  return { id, ...userData };
}

// Delete a user
async function deleteUser(id) {
  await pool.query('DELETE FROM user WHERE id = ?', [id]);
}

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser
};
