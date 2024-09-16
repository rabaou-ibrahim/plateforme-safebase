const pool = require('../utils/db');  // Import the DB connection pool

// Get all connexions
async function findAllConnexions() {
  const [rows] = await pool.query('SELECT * FROM connexion');
  return rows;
}

// Get connexion by ID
async function findConnexionById(id) {
  const [rows] = await pool.query('SELECT * FROM connexion WHERE id = ?', [id]);
  return rows[0];
}

// Create a new connexion
async function createConnexion(connexionData) {
    const [result] = await pool.query('INSERT INTO connexion SET ?', connexionData);
    return { id: result.insertId, ...connexionData };
  }
  
  // Update a connexion
  async function updateConnexion(id, connexionData) {
    await pool.query('UPDATE connexion SET ? WHERE id = ?', [connexionData, id]);
    return { id, ...connexionData };
  }
  
  // Delete a connexion
  async function deleteConnexion(id) {
    await pool.query('DELETE FROM connexion WHERE id = ?', [id]);
  }

module.exports = {
  findAllConnexions,
  findConnexionById,
  createConnexion,
  updateConnexion,
  deleteConnexion
};