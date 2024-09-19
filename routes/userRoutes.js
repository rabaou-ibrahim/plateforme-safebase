const userController = require('../controllers/userController');
const bcrypt = require('bcrypt');
const db = require('../utils/db'); // Ensure this path is correct

module.exports = async function (fastify) {
  // Route d'inscription
  fastify.post('/register', async (req, reply) => {
    const { email, password, firstname, lastname } = req.body;

    // Validation des champs
    if (!email || !password || !firstname || !lastname) {
      return reply.status(400).send('Tous les champs doivent être remplis');
    }

    // Vérifier si l'utilisateur existe déjà
    try {
      const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

      if (rows.length > 0) {
        return reply.status(400).send('Cet email est déjà utilisé');
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      // Insérer le nouvel utilisateur dans la base de données
      await db.query('INSERT INTO user (email, password, firstname, lastname, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)', 
        [email, hashedPassword, firstname, lastname, currentDate, currentDate]);

      reply.status(201).send('Utilisateur enregistré avec succès');
    } catch (err) {
      console.error(err);
      reply.status(500).send('Erreur lors de l\'inscription');
    }
  });

  // Route de connexion
  fastify.post('/login', async (req, reply) => {
    const { email, password } = req.body;

    try {
      // Rechercher l'utilisateur dans la base de données
      const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

      if (rows.length === 0) {
        return reply.status(401).send('Email ou mot de passe incorrect');
      }

      // Vérifier le mot de passe
      const validPassword = await bcrypt.compare(password, rows[0].password);
      if (!validPassword) {
        return reply.status(401).send('Email ou mot de passe incorrect');
      }

      // Stocker l'utilisateur dans la session
      req.session.user = rows[0];
      reply.send('Connexion réussie');
    } catch (err) {
      console.error(err);
      reply.status(500).send('Erreur lors de la connexion');
    }
  });

  // Route pour accéder au tableau de bord
  fastify.get('/dashboard', (req, reply) => {
    if (!req.session.user) {
      return reply.status(401).send('Vous devez être connecté');
    }

    reply.send(`Bienvenue, ${req.session.user.firstname}`);
  });

  // Route de déconnexion
  fastify.post('/logout', (req, reply) => {
    req.session.destroy();
    reply.send('Déconnexion réussie');
  });
};