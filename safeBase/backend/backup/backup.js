const mysqldump = require('mysqldump');
const fs = require('fs');
const path = require('path');

function createBackupFolder() {
  const backupDir = path.resolve(__dirname, 'backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }
}

async function backupDatabase() {
  createBackupFolder();
  const timestamp = new Date().toISOString().replace(/[-T:.]/g, '');
  const dumpFile = `./backup/backup_${timestamp}.sql`;

  try {
    await mysqldump({
      connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'plateforme_safe_base',
      },
      dumpToFile: dumpFile,
    });
    console.log(`Backup de la base de données effectué : ${dumpFile}`);
  } catch (error) {
    console.error('Erreur lors du backup :', error);
  }
}

backupDatabase();
