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
  // Log pour voir si la requête est bien reçue
  console.log('Restore request received:', req.params);

  const { backup_id } = req.params;

  try {
    // Log pour vérifier la valeur du backup_id
    console.log('Backup ID:', backup_id);

    const result = await dumpService.restoreDumpService(backup_id);

    // Log du résultat retourné par le service
    console.log('Restore result:', result);

    reply.code(200).send(result);
  } catch (error) {
    // Log de l'erreur, si elle se produit
    console.error('Error during restore:', error);

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
