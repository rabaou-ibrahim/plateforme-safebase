const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();

async function getAllUsers(req, reply) {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) return reply.send({ status: 'failed', error: error.message });
    reply.send(results);
  });
}

async function getUserById(req, reply) {
  const { id } = req.params;
  connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
    if (error) return reply.send({ status: 'failed', error: error.message });
    if (results.length === 0) return reply.code(404).send({ status: 'not found' });
    reply.send(results[0]);
  });
}

async function createUser(req, reply) {
  const user = req.body;
  connection.query('INSERT INTO users SET ?', user, (error, results) => {
    if (error) return reply.send({ status: 'failed', error: error.message });
    reply.code(201).send({ id: results.insertId, ...user });
  });
}

async function updateUser(req, reply) {
  const { id } = req.params;
  const user = req.body;
  connection.query('UPDATE users SET ? WHERE id = ?', [user, id], (error, results) => {
    if (error) return reply.send({ status: 'failed', error: error.message });
    if (results.affectedRows === 0) return reply.code(404).send({ status: 'not found' });
    reply.send({ id, ...user });
  });
}

async function deleteUser(req, reply) {
  const { id } = req.params;
  connection.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
    if (error) return reply.send({ status: 'failed', error: error.message });
    if (results.affectedRows === 0) return reply.code(404).send({ status: 'not found' });
    reply.code(204).send();
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
