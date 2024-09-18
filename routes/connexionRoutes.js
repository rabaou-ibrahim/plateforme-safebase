const connexionController = require('../controllers/connexionController');

module.exports = async function (fastify) {
  fastify.get('/connexions', connexionController.getAllConnexions);
  fastify.get('/connexions/:id', connexionController.getConnexionById);
  fastify.post('/connexions', connexionController.createConnexion);
  fastify.put('/connexions/:id', connexionController.updateConnexion);
  fastify.delete('/connexions/:id', connexionController.deleteConnexion);
};
