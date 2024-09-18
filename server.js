require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const dumpService = require('./services/dumpService');

// Importation des routes
const userRoutes = require('./routes/userRoutes');
const backupRoutes = require('./routes/backupRoutes');
const connexionRoutes = require('./routes/connexionRoutes');
const executionRoutes = require('./routes/executionRoutes');
const roleRoutes = require('./routes/roleRoutes');
const dumpRoutes = require('./routes/dumpRoutes');

// Enregistrement des routes
fastify.register(userRoutes);
fastify.register(backupRoutes);
fastify.register(connexionRoutes);
fastify.register(executionRoutes);
fastify.register(roleRoutes);
fastify.register(dumpRoutes);

// Démarrage du serveur
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });

    // Initialiser les tâches CRON
    try {
      await dumpService.initializeBackupSchedules();
      console.log('Backup schedules initialized.');
    } catch (cronError) {
      console.error('Error initializing backup schedules:', cronError);
    }

    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
