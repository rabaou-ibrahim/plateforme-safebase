const userController = require('../controllers/userController');

module.exports = async function (fastify) {
  fastify.get('/users', userController.getAllUsers);
  fastify.get('/users/:id', userController.getUserById);
  fastify.post('/users', userController.createUser);
  fastify.put('/users/:id', userController.updateUser);
  fastify.delete('/users/:id', userController.deleteUser);

  fastify.get('/test-db', async (req, reply) => {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    connection.connect((err) => {
      if (err) {
        return reply.send({ status: 'failed', error: err.message });
      }
      reply.send({ status: 'success', message: 'Database connected successfully' });
      connection.end();
    });
  });
};
