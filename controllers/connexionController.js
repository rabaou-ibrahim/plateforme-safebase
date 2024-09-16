const { findAllConnexions } = require('../models/connexionModel');

exports.getAllConnexions = async (req, reply) => {
    try {
      const connexions = await findAllConnexions();
      return reply.send(connexions);
    } catch (err) {
      return reply.code(500).send({ error: 'Failed to fetch connexions' });
    }
  };