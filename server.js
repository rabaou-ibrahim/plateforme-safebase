require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const dumpService = require('./services/dumpService');
const fastifyCookie = require('@fastify/cookie');
const fastifySession = require('fastify-session');

// Plugins pour la gestion des sessions et des cookies
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: 'your_very_long_super_secret_key_that_is_at_least_32_characters_long',
  cookie: { secure: false }, // Mettre à true en production avec HTTPS
  saveUninitialized: false,
  resave: false,
});


// Importation des routes
const userRoutes = require('./routes/userRoutes');
const backupRoutes = require('./routes/backupRoutes');
const connexionRoutes = require('./routes/connexionRoutes');
const executionRoutes = require('./routes/executionRoutes');
const roleRoutes = require('./routes/roleRoutes');
const dumpRoutes = require('./routes/dumpRoutes');

// Enregistrement des routes
fastify.register(userRoutes, { prefix: '/users' }); // Préfixe pour les routes utilisateurs
fastify.register(backupRoutes);
fastify.register(connexionRoutes);
fastify.register(executionRoutes);
fastify.register(roleRoutes);
fastify.register(dumpRoutes);

// Démarrage du serveur
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });

    // Restaurer
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
