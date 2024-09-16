const backupController = require('../controllers/backupController');

module.exports = async function (fastify) {
  fastify.get('/backups', backupController.getAllBackups);
};
