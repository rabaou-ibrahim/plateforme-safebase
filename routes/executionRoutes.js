const executionController = require('../controllers/executionController');

module.exports = async function (fastify) {
  fastify.get('/executions', executionController.getAllExecutions);
  fastify.get('/executions/:id', executionController.getExecutionById);
  fastify.post('/executions', executionController.createExecution);
  fastify.put('/executions/:id', executionController.updateExecution);
  fastify.delete('/executions/:id', executionController.deleteExecution);
};
