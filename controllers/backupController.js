const { findAllBackups, findBackupById, createBackup, updateBackup, deleteBackup } = require('../models/backupModel');


exports.getAllBackups = async (req, reply) => {
  try {
    const backups = await findAllBackups();
    return reply.send(backups);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to fetch Backups" });
  }
};

exports.getBackupById = async (req, reply) => {
  try {
    const backup = await findBackupById(req.params.id);
    if (!backup) {
      return reply.code(404).send({ error: "Backup not found" });
    }
    return reply.send(backup);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to fetch Backup" });
  }
};

exports.createBackup = async (req, reply) => {
  try {
    const newBackup = await createBackup(req.body);
    return reply.code(201).send(newBackup);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to create Backup" });
  }
};

exports.updateBackup = async (req, reply) => {
  try {
    const updatedBackup = await updateBackup(req.params.id, req.body);
    return reply.send(updatedBackup);
  } catch (err) {
    return reply.code(500).send({ error: "Failed to update Backup" });
  }
};

exports.deleteBackup = async (req, reply) => {
  try {
    await deleteBackup(req.params.id);
    return reply.code(204).send();
  } catch (err) {
    return reply.code(500).send({ error: "Failed to delete Backup" });
  }
};
