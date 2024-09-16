const userController = require('../controllers/userController');

module.exports = async function (fastify) {
  fastify.get('/users', userController.getAllUsers);
  fastify.get('/users/:id', userController.getUserById);
  fastify.post('/users', userController.createUser);
  fastify.put('/users/:id', userController.updateUser);
  fastify.delete('/users/:id', userController.deleteUser);
};
