const pool = require('../utils/db');  // Import the DB connection pool

// Get all executions
async function findAllExecutions() {
  const [rows] = await pool.query('SELECT * FROM execution');
  return rows;
}

// Get execution by ID
async function findExecutionById(id) {
  const [rows] = await pool.query('SELECT * FROM execution WHERE id = ?', [id]);
  return rows[0];
}

// Create a new execution
async function createExecution(executionData) {
  const [result] = await pool.query('INSERT INTO execution SET ?', executionData);
  return { id: result.insertId, ...executionData };
}

// Update a execution
async function updateExecution(id, executionData) {
  await pool.query('UPDATE execution SET ? WHERE id = ?', [executionData, id]);
  return { id, ...executionData };
}

// Delete a execution
async function deleteExecution(id) {
  await pool.query('DELETE FROM execution WHERE id = ?', [id]);
}

module.exports = {
  findAllExecutions,
  findExecutionById,
  createExecution,
  updateExecution,
  deleteExecution
};