const { findAllExecutions } = require('../models/executionModel');

exports.getAllExecutions = async (req, reply) => {
    try {
      const executions = await findAllExecutions();
      return reply.send(executions);
    } catch (err) {
      return reply.code(500).send({ error: 'Failed to fetch executions' });
    }
  };