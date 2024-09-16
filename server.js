require('dotenv').config(); // Load environment variables
const fastify = require('fastify')({ logger: true });
const userRoutes = require('./routes/userRoutes');

// Register routes
fastify.register(userRoutes);

// Start the server
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
