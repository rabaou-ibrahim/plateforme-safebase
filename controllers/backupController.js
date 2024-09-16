const { findAllBackups } = require('../models/backupModel');

exports.getAllBackups = async (req, reply) => {
    try {
      const backups = await findAllBackups();
      return reply.send(backups);
    } catch (err) {
      return reply.code(500).send({ error: 'Failed to fetch backups' });
    }
  };