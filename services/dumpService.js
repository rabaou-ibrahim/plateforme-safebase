const { exec } = require('child_process');
const cron = require('node-cron');
const db = require('../utils/db');

// Service pour démarrer un dump (backup)
exports.startDumpService = async (connexion_id) => {
  try {
    // Récupération des informations de connexion
    const [result] = await db.query('SELECT * FROM connexion WHERE id = ?', [connexion_id]);
    
    if (!result || result.length === 0) {
      throw new Error('Connexion not found');
    }
    
    const connexion = result[0];

    // Démarrer une nouvelle exécution
    const [executionResult] = await db.query(
      'INSERT INTO execution (backup_id, status, start_time) VALUES (?, ?, NOW())',
      [connexion_id, 'en cours']
    );
    const executionId = executionResult.insertId;

    // Paramètres pour la commande de dump
    const { username, password, host, port, name } = connexion;
    const dumpFile = `C:/wamp64/www/plateforme-safebase/var/backups/${name}_backup.sql`;
    const command = password
      ? `mysqldump -u ${username} -p${password} -h ${host} --port=${port} ${name} > ${dumpFile}`
      : `mysqldump -u ${username} -h ${host} --port=${port} ${name} > ${dumpFile}`;

    console.log(`Executing command: ${command}`);

    return new Promise((resolve, reject) => {
      exec(command, async (error, stdout, stderr) => {
        if (error) {
          // Mise à jour de l'exécution à "échoué"
          await db.query('UPDATE execution SET status = ?, error_message = ?, end_time = NOW() WHERE id = ?', 
                         ['échoué', stderr, executionId]);
          reject(`Error during dump: ${stderr}`);
        } else {
          // Mise à jour de l'exécution à "réussi"
          await db.query('UPDATE execution SET status = ?, end_time = NOW() WHERE id = ?', ['réussi', executionId]);
          resolve({ message: 'Dump completed successfully', output: stdout });
        }
      });
    });
  } catch (error) {
    console.error(`Error during dump: ${error.message}`);
    throw new Error(`Error during dump: ${error.message}`);
  }
};

// Service pour restaurer une base de données à partir d'un backup
exports.restoreDumpService = async (backup_id) => {
  try {
    const [backup] = await db.query('SELECT * FROM backup WHERE id = ?', [backup_id]);
    const [connexion] = await db.query('SELECT * FROM connexion WHERE id = ?', [backup[0].connexion_id]);

    if (!backup || !connexion) {
      throw new Error('Backup or connexion not found');
    }

    // Démarrer une nouvelle exécution de restauration
    const [executionResult] = await db.query(
      'INSERT INTO execution (backup_id, status, start_time) VALUES (?, ?, NOW())',
      [backup[0].connexion_id, 'en cours']
    );
    const executionId = executionResult.insertId;

    const dumpFile = `C:/wamp64/www/plateforme-safebase/var/backups/${backup[0].name}_backup.sql`;
    const command = connexion[0].password
      ? `mysql -u ${connexion[0].username} -p${connexion[0].password} -h ${connexion[0].host} --port=${connexion[0].port} ${connexion[0].name} < ${dumpFile}`
      : `mysql -u ${connexion[0].username} -h ${connexion[0].host} --port=${connexion[0].port} ${connexion[0].name} < ${dumpFile}`;

    console.log('Command to execute:', command);

    return new Promise((resolve, reject) => {
      exec(command, async (error, stdout, stderr) => {
        if (error) {
          await db.query('UPDATE execution SET status = ?, error_message = ?, end_time = NOW() WHERE id = ?', 
                         ['échoué', stderr, executionId]);
          reject(`Error during restore: ${stderr}`);
        } else {
          await db.query('UPDATE execution SET status = ?, end_time = NOW() WHERE id = ?', ['réussi', executionId]);
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
  const cronSchedule = backup.CRON;

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

// Initialiser les backups planifiés
exports.initializeBackupSchedules = async () => {
  try {
    const [result] = await db.query('SELECT * FROM backup');
    
    if (result.length > 0) {
      result.forEach((backup) => {
        if (backup && typeof backup.CRON === 'string' && backup.CRON.trim() !== '') {
          // Planifiez le backup
          this.scheduleBackupService(backup);
        } else {
          console.error(`Invalid CRON pattern: ${backup ? backup.CRON : 'undefined'}`);
        }
      });
    } else {
      console.error('No backup data found or unexpected format');
    }
  } catch (error) {
    console.error(`Error initializing backup schedules: ${error.message}`);
  }
};

// Obtenir le statut d'une exécution (dump ou restauration)
exports.getDumpStatusService = async (execution_id) => {
  try {
    const [execution] = await db.query('SELECT * FROM execution WHERE id = ?', [execution_id]);

    if (!execution || execution.length === 0) {
      throw new Error('Execution not found');
    }

    return {
      status: execution[0].status,
      start_time: execution[0].start_time,
      end_time: execution[0].end_time,
      error_message: execution[0].error_message
    };
  } catch (error) {
    throw new Error(`Error fetching execution status: ${error.message}`);
  }
};
