const connexionController = require('../controllers/connexionController');

module.exports = async function (fastify) {
  fastify.get('/connexions', connexionController.getAllConnexions);
};
