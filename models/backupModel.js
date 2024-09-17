const pool = require("../utils/db"); // Import the DB connection pool

// Get all backups
async function findAllBackups() {
  const [rows] = await pool.query("SELECT * FROM backup");
  return rows;
}

// Get backup by ID
async function findBackupById(id) {
  const [rows] = await pool.query("SELECT * FROM backup WHERE id = ?", [id]);
  return rows[0];
}

// Create a new backup
async function createBackup(backupData) {
  const [result] = await pool.query("INSERT INTO backup SET ?", backupData);
  return { id: result.insertId, ...backupData };
}

// Update a backup
async function updateBackup(id, backupData) {
  await pool.query("UPDATE backup SET ? WHERE id = ?", [backupData, id]);
  return { id, ...backupData };
}

// Delete a backup
async function deleteBackup(id) {
  await pool.query("DELETE FROM backup WHERE id = ?", [id]);
}

module.exports = {
  findAllBackups,
  findBackupById,
  createBackup,
  updateBackup,
  deleteBackup,
};
