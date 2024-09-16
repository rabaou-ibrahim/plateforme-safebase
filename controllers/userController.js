const { findAllUsers, findUserById, createUser, updateUser, deleteUser } = require('../models/userModel');

exports.getAllUsers = async (req, reply) => {
  try {
    const users = await findAllUsers();
    return reply.send(users);
  } catch (err) {
    return reply.code(500).send({ error: 'Failed to fetch users' });
  }
};

exports.getUserById = async (req, reply) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }
    return reply.send(user);
  } catch (err) {
    return reply.code(500).send({ error: 'Failed to fetch user' });
  }
};

exports.createUser = async (req, reply) => {
  try {
    const newUser = await createUser(req.body);
    return reply.code(201).send(newUser);
  } catch (err) {
    return reply.code(500).send({ error: 'Failed to create user' });
  }
};

exports.updateUser = async (req, reply) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    return reply.send(updatedUser);
  } catch (err) {
    return reply.code(500).send({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, reply) => {
  try {
    await deleteUser(req.params.id);
    return reply.code(204).send();
  } catch (err) {
    return reply.code(500).send({ error: 'Failed to delete user' });
  }
};
