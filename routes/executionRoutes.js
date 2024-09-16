const executionController = require('../controllers/executionController');

module.exports = async function (fastify) {
  fastify.get('/executions', executionController.getAllExecutions);
};
