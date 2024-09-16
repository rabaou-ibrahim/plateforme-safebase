const { findAllRoles, findRoleById, createRole, updateRole, deleteRole } = require('../models/roleModel');


exports.getAllRoles = async (req, reply) => {
  try {
    const roles = await findAllRoles();
    return reply.send(roles);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to fetch roles" });
  }
};

exports.getRoleById = async (req, reply) => {
  try {
    const role = await findRoleById(req.params.id);
    if (!role) {
      return reply.code(404).send({ error: "role not found" });
    }
    return reply.send(role);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to fetch Role" });
  }
};

exports.createRole = async (req, reply) => {
  try {
    const newRole = await createRole(req.body);
    return reply.code(201).send(newRole);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to create Role" });
  }
};

exports.updateRole = async (req, reply) => {
  try {
    const updatedRole = await updateRole(req.params.id, req.body);
    return reply.send(updatedRole);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to update role" });
  }
};

exports.deleteRole = async (req, reply) => {
  try {
    await deleteRole(req.params.id);
    return reply.code(204).send();
  } catch (err) {
    return reply.code(500).send({ error: "Failed to delete role" });
  }
};
