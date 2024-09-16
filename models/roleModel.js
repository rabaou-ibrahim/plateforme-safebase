const pool = require('../utils/db');  // Import the DB connection pool

// Get all roles
async function findAllRoles() {
  const [rows] = await pool.query('SELECT * FROM role');
  return rows;
}

// Get role by ID
async function findRoleById(id) {
  const [rows] = await pool.query('SELECT * FROM role WHERE id = ?', [id]);
  return rows[0];
}

// Create a new role
async function createRole(roleData) {
  const [result] = await pool.query('INSERT INTO role SET ?', roleData);
  return { id: result.insertId, ...roleData };
}

// Update a role
async function updateRole(id, roleData) {
  await pool.query('UPDATE role SET ? WHERE id = ?', [roleData, id]);
  return { id, ...roleData };
}

// Delete a role
async function deleteRole(id) {
  await pool.query('DELETE FROM role WHERE id = ?', [id]);
}

// Create a new role
async function createRole(roleData) {
    const [result] = await pool.query('INSERT INTO role SET ?', roleData);
    return { id: result.insertId, ...roleData };
  }
  
  // Update a role
  async function updateRole(id, roleData) {
    await pool.query('UPDATE role SET ? WHERE id = ?', [roleData, id]);
    return { id, ...roleData };
  }
  
  // Delete a role
  async function deleteRole(id) {
    await pool.query('DELETE FROM role WHERE id = ?', [id]);
  }

module.exports = {
  findAllRoles,
  findRoleById,
  createRole,
  updateRole,
  deleteRole
};
