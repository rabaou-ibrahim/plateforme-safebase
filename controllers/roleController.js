const { findAllRoles } = require('../models/roleModel');

exports.getAllRoles = async (req, reply) => {
    try {
      const roles = await findAllRoles();
      return reply.send(roles);
    } catch (err) {
      return reply.code(500).send({ error: 'Failed to fetch roles' });
    }
  };
