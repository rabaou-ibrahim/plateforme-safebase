// Import the Fastify module
const fastify = require('fastify')({ logger: true });

// Define a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`Server running at http://localhost:3000/`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
