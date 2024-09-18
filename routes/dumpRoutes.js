const dumpController = require('../controllers/dumpController');

module.exports = (fastify, opts, done) => {
  // Route pour démarrer un dump
  fastify.post('/dumps/:connexion_id', dumpController.startDump);

  // Route pour restaurer une base de données à partir d'un backup
  fastify.post('/restore/:backup_id', dumpController.restoreDump);

  // Route pour obtenir le statut d'une exécution (dump ou restauration)
  fastify.get('/status/:execution_id', dumpController.getDumpStatus);

  done();
};
