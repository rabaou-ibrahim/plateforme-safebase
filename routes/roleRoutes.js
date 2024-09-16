const roleController = require('../controllers/roleController');

module.exports = async function (fastify) {
  fastify.get('/roles', roleController.getAllRoles);
};
