const backupController = require('../controllers/backupController');

module.exports = async function (fastify) {
  fastify.get('/backups', backupController.getAllBackups);
  fastify.get('/backups/:id', backupController.getBackupById);
  fastify.post('/backups', backupController.createBackup);
  fastify.put('/backups/:id', backupController.updateBackup);
  fastify.delete('/backups/:id', backupController.deleteBackup);
  fastify.post('/backups/:id/restore', backupController.restoreBackup);
};
