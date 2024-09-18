const dumpService = require('../services/dumpService');

// Contrôleur pour démarrer un dump
exports.startDump = async (req, reply) => {
  const { connexion_id } = req.params;
  try {
    const result = await dumpService.startDumpService(connexion_id);
    reply.code(200).send(result);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

// Contrôleur pour restaurer un dump
exports.restoreDump = async (req, reply) => {
  const { backup_id } = req.params;
  try {
    const result = await dumpService.restoreDumpService(backup_id);
    reply.code(200).send(result);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};

// Contrôleur pour obtenir le statut d'un dump ou d'une restauration
exports.getDumpStatus = async (req, reply) => {
  const { execution_id } = req.params;
  try {
    const result = await dumpService.getDumpStatusService(execution_id);
    reply.code(200).send(result);
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
};
