require('dotenv').config();
const fastify = require('fastify')({ logger: true });

const userRoutes = require('./routes/userRoutes');
const backupRoutes = require('./routes/backupRoutes');
const connexionRoutes = require('./routes/connexionRoutes');
const executionRoutes = require('./routes/executionRoutes');
const roleRoutes = require('./routes/roleRoutes');

// Register routes
fastify.register(userRoutes);
fastify.register(backupRoutes);
fastify.register(connexionRoutes);
fastify.register(executionRoutes);
fastify.register(roleRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
