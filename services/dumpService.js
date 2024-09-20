const { exec } = require('child_process');
const cron = require('node-cron');
const db = require('../utils/db');

exports.startDumpService = async (connexion_id) => {
  try {
    // Récupération des informations de connexion
    const [result] = await db.query('SELECT * FROM connexion WHERE id = ?', [connexion_id]);

    // Vérifie si result est un tableau et si l'entrée existe
    if (!result || result.length === 0) {
      throw new Error('Connexion not found');
    }

    const connexion = result[0]; // Assure-toi que connexion soit bien la première entrée du tableau

    // Log pour vérifier les détails de la connexion
    console.log('Connection details:', connexion);

    // Extraction des propriétés de connexion
    const { username, password, host, port, name } = connexion;

    if (!username || !host || !name || !port) {
      throw new Error('Missing required connection details');
    }

    // Nom du fichier de backup
    const dumpFile = `C:/wamp64/www/plateforme-safebase/var/backups/${name}_backup.sql`;

    // Commande mysqldump avec gestion du mot de passe vide
    const command = password
      ? `mysqldump -u ${username} -p${password} -h ${host} --port=${port} ${name} > ${dumpFile}`
      : `mysqldump -u ${username} -h ${host} --port=${port} ${name} > ${dumpFile}`;

    // Log de la commande pour vérification
    console.log(`Executing command: ${command}`);

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Error during dump: ${stderr}`);
        } else {
          resolve({ message: 'Dump completed successfully', output: stdout });
        }
      });
    });
  } catch (error) {
    console.error(`Error during dump: ${error.message}`);
    throw new Error(`Error during dump: ${error.message}`);
  }
};

exports.restoreDumpService = async (backup_id) => {
  try {
    console.log('Fetching backup for ID:', backup_id);

    // Récupération du backup
    const [backup] = await db.query('SELECT * FROM backup WHERE id = ?', [backup_id]);
    console.log('Backup found:', backup);

    // Récupération des informations de connexion
    const [connexion] = await db.query('SELECT * FROM connexion WHERE id = ?', [backup[0].connexion_id]);
    console.log('Connexion found:', connexion);

    if (!backup || !connexion) {
      throw new Error('Backup or connexion not found');
    }

    // Chemin du fichier dump à restaurer
    const dumpFile = `C:/wamp64/www/plateforme-safebase/var/backups/${backup[0].name}_backup.sql`;
    console.log('Dump file path:', dumpFile);

    // Utiliser la commande "mysql" pour restaurer à partir du fichier dump dans la base de données
    const command = connexion[0].password
      ? `mysql -u ${connexion[0].username} -p${connexion[0].password} -h ${connexion[0].host} --port=${connexion[0].port} ${connexion[0].name} < ${dumpFile}`
      : `mysql -u ${connexion[0].username} -h ${connexion[0].host} --port=${connexion[0].port} ${connexion[0].name} < ${dumpFile}`;

    console.log('Command to execute:', command);

    // Exécution de la commande pour restaurer la base de données
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Error during restore execution:', stderr);
          reject(`Error during restore: ${stderr}`);
        } else {
          console.log('Restore completed successfully:', stdout);
          resolve({ message: 'Database restored successfully', output: stdout });
        }
      });
    });
  } catch (error) {
    console.error('Error in restoreDumpService:', error.message);
    throw new Error(`Error during restore: ${error.message}`);
  }
};

// Planifier un backup via CRON
exports.scheduleBackupService = (backup) => {
  const cronSchedule = backup.CRON; // e.g., '0 0 * * *' for daily at midnight

  cron.schedule(cronSchedule, async () => {
    console.log(`Starting scheduled backup for connexion ID: ${backup.connexion_id}`);
    try {
      await this.startDumpService(backup.connexion_id);
      console.log(`Scheduled backup completed for connexion ID: ${backup.connexion_id}`);
    } catch (error) {
      console.error(`Error during scheduled backup: ${error.message}`);
    }
  });
};

exports.initializeBackupSchedules = async () => {
  try {
    const result = await db.query('SELECT * FROM backup');
    console.log('Result fetched:', result); // Affiche le résultat brut pour déboguer

    // Vérifiez si le résultat est un tableau et contient des données
    if (Array.isArray(result) && result.length > 0) {
      // Si le premier élément du tableau contient les données de backup
      const backups = result[0];

      backups.forEach((backup) => {
        // Vérifiez si backup est un objet et contient la propriété CRON
        if (backup && typeof backup.CRON === 'string' && backup.CRON.trim() !== '') {
          // Planifiez le backup
          this.scheduleBackupService(backup);
        } else {
          console.error(`Invalid CRON pattern: ${backup ? backup.CRON : 'undefined'}`);
        }
      });
    } else {
      console.error('No backup data found or unexpected format:', result);
    }
  } catch (error) {
    console.error(`Error initializing backup schedules: ${error.message}`);
  }
};

// Obtenir le statut d'une exécution (dump ou restauration)
exports.getDumpStatusService = async (execution_id) => {
  try {
    const [execution] = await db.query('SELECT * FROM execution WHERE id = ?', [execution_id]);

    if (!execution) {
      throw new Error('Execution not found');
    }

    return {
      status: execution.status,
      start_time: execution.start_time,
      end_time: execution.end_time,
    };
  } catch (error) {
    throw new Error(`Error fetching execution status: ${error.message}`);
  }
};
