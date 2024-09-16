const { findAllConnexions, findConnexionById, createConnexion, updateConnexion, deleteConnexion } = require('../models/connexionModel');


exports.getAllConnexions = async (req, reply) => {
  try {
    const connexions = await findAllConnexions();
    return reply.send(connexions);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to fetch connexions" });
  }
};

exports.getConnexionById = async (req, reply) => {
  try {
    const connexion = await findConnexionById(req.params.id);
    if (!connexion) {
      return reply.code(404).send({ error: "Connexion not found" });
    }
    return reply.send(connexion);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to fetch connexion" });
  }
};

exports.createConnexion = async (req, reply) => {
  try {
    const newConnexion = await createConnexion(req.body);
    return reply.code(201).send(newConnexion);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to create connexion" });
  }
};

exports.updateConnexion = async (req, reply) => {
  try {
    const updatedConnexion = await updateConnexion(req.params.id, req.body);
    return reply.send(updatedConnexion);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to update connexion" });
  }
};

exports.deleteConnexion = async (req, reply) => {
  try {
    await deleteConnexion(req.params.id);
    return reply.code(204).send();
  } catch (err) {
    return reply.code(500).send({ error: "Failed to delete connexion" });
  }
};
