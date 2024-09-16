const { findAllExecutions, findExecutionById, createExecution, updateExecution, deleteExecution } = require('../models/executionModel');


exports.getAllExecutions = async (req, reply) => {
  try {
    const executions = await findAllExecutions();
    return reply.send(executions);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to fetch executions" });
  }
};

exports.getExecutionById = async (req, reply) => {
  try {
    const execution = await findExecutionById(req.params.id);
    if (!execution) {
      return reply.code(404).send({ error: "Execution not found" });
    }
    return reply.send(execution);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to fetch execution" });
  }
};

exports.createExecution = async (req, reply) => {
  try {
    const newExecution = await createExecution(req.body);
    return reply.code(201).send(newExecution);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to create execution" });
  }
};

exports.updateExecution = async (req, reply) => {
  try {
    const updatedExecution = await updateExecution(req.params.id, req.body);
    return reply.send(updatedExecution);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to update execution" });
  }
};

exports.deleteExecution = async (req, reply) => {
  try {
    await deleteExecution(req.params.id);
    return reply.code(204).send();
  } catch (err) {
    return reply.code(500).send({ error: "Failed to delete execution" });
  }
};
